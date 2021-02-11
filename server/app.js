/////////////node modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

const app = express();

/////////////custom imports
const User = require('./models/user.model.js');
const authRoutes = require('./routes/auth.routes.js');
const initializePassport = require('./passportConfig.js');

initializePassport();

/////////////mongoDB Setup

const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster.32j3c.mongodb.net/testdb?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

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

app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).send('invalid route');
});