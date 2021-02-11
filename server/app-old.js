const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //eine Strategy ist eine Art, sich zu authentifizieren (local bedeute Username und Passwort)

require('dotenv').config();

const app = express();

/////////////mongoDB Setup

const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster.32j3c.mongodb.net/testdb?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

const User = require('./models/user.model.js');

/////////////Passportjs Setup

passport.use(new LocalStrategy(
  (username, password, done) => {
    //sucht in der Datenbank nach dem Benutzer 
    User.findOne({ username: username }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'incorrect username' });
      }
      if (!await bcrypt.compare(password, user.password)) {
        return done(null, false, { message: 'incorrect password' });
      }
      return done(null, user);
    });
  }
));
//diese Funktion erzeugt eine Session auf Basis der User-ID (beim Login aufgerufen)
passport.serializeUser((user, done) => {
  done(null, user._id);  //nur die id des Users wird in der Session selbst geispeichert
});
//diese Funktion liest die ID aus dem mitgesendeten Cookie und macht daraus wieder ein User-Objekt, wird bei jedem Request an eine durch middleware geschützte Route ausgeführt
passport.deserializeUser((id, done) => {  //bei serializeUser wurde nur die id in der Session gespeichert, hier wird das mitgesendete Cookie encoded und nach dem User mit der im Cookie enthaltenen ID gesucht
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/////////////Middleware

//app.use(express.urlencoded({ extended: true })); //für Form-Anfragen aus einem HTML-Formular | extended-Parameter true erlaubt verschachtelte Daten (also Objekte in Objekten)
app.use(express.json());  //für JSON-Anfragen via Postman
app.use(session({
  secret: process.env.SESSION_SECRET, //secret, mit dem das Session-Cookie verschlüsselt wird
  //Folgende zwei Zeilen sind wichtig, wenn ein Client ein Request ohne Session-Cookie macht
  //in diesem Fall wird auf dem Server trotzdem eine Session erstellt, die aber nichts enthält
  saveUninitialized: false, //wenn false wird die leere Session nicht gespeichert und auch kein Cookie an den Client gesendet, wenn true passiert beides (damit kann man wiederkehrende Nutzer, die nicht eingeloggt sein müssen erkennen)
  resave: false //Falls sich nichts geändert hat, Session nicht neu speichern (gewisse Session-Stores brauchen hier true, andere nicht)
}));
app.use(passport.initialize());
app.use(passport.session());  //damit Passport Sessions verwendet
app.use(cors());

if (process.env.NODE_ENV === 'production') { //wenn App im Produktions nicht im Dev-Modus läuft wird statischer Ordner gesetzt
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));  //ungültige Routes werden an die index.html weitergeleitet
}

/////////////Route Handlers

app.get('/api/test', (req, res) => {
  res.send(res);
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { //das ist eine custom-Funktion, da die 
    if (err) {
      return next(err); //vermutlich falls ein Server-Fehler auftaucht
    }
    if(!req.body.username || !req.body.password) { //falls Benutzername oder Passwort leer
      return res.status(401).send('please provide username and password');
    }
    if (!user) {  //wenn der Benutzer sich nicht richtig anmeldet, ist der user nicht gesetzt
      return res.status(401).send(info.message);
    }
    req.login(user, err => {  //.login ist eine passportjs-Funktion, die den Benutzer einloggt und eine Session erstellt
      if (err) {  //falls Fehler bei diesem Prozess auftaucht
        return next(err);
      }
      //falls alles geklappt hat
      return res.sendStatus(200);
    });
  })(req, res, next); //passport.authenticate gibt eine Funktion zurück, deshalb hier das (req, res, next) am Ende (verstehe trotzdem nicht genau was das macht)
});

app.get('/api/authenticate',
  (req, res, next) => {   //Middleware, die überprüft, ob der User authentifiziert ist (also das Cookie auf dem Rechner hat) --> für skalierbarkeit in eigene Funktion auslagern
    if (req.isAuthenticated()) {  //isAuthenticated() ist eine passportjs-Funktion aber nirgends dokumentiert
      return next();
    }
    res.status(401).send('not authenticated');
  },
  (req, res) => { //eigentliche Funktion, durch Middleware geschützt
    const user = req.user;  //in req.user ist der User, der bei deserializeUser oben aus dem Array gezogen wurde
    res.send({
      username: user.username,
      createdAt: user.createdAt
    });
  }
);

app.post('/api/register', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.passwordRepeat) { //wenn Username und Password nicht gesetzt oder leerer string
    return res.status(400).send('please provide username and password');
  }
  if (req.body.password !== req.body.passwordRepeat) {
    return res.status(400).send('passwords are not the same');
  }

  const user = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10)
  });
  //mongoose Query, das prüft ob Username exisitiert und wenn nicht den User in die DB schreibt
  User.exists({ username: user.username }, (err, exists) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (exists) {
      return res.status(409).send('Username already taken');
    }
    user.save()
      .then(result => {
        req.login(result, err => {  //falls Benutzer erfolgreich erstellt über die passportjs-Funktion req.login direkt einloggen (Session erstellen und Cookie an client senden)
          if (err) {
            return res.sendStatus(500);
          }
          return res.status(201).send('User created');
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('could not save user to db');
      });
  });
});

app.post('/api/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

/* app.get('/secured',
  (req, res, next) => {   //Middleware, die überprüft, ob der User authentifiziert ist (also das Cookie auf dem Rechner hat) --> für skalierbarkeit in eigene Funktion auslagern
    if (req.isAuthenticated()) {  //isAuthenticated() ist eine passportjs-Funktion aber nirgends dokumentiert
      return next();
    }
    res.status(401).send('not authenticated');
  },
  (req, res) => { //eigentliche Funktion, durch Middleware geschützt
    const user = req.user;  //in req.user ist der User, der bei deserializeUser oben aus dem Array gezogen wurde
    res.send(user);
  }
); */