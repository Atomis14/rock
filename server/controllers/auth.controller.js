const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model.js');

const login = (req, res, next) => {
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
}

const authenticate = (req, res) => { //eigentliche Funktion, durch Middleware geschützt
  const user = req.user;  //in req.user ist der User, der bei deserializeUser oben aus dem Array gezogen wurde
  res.send({
    username: user.username,
    createdAt: user.createdAt
  });
}

const register = async (req, res) => {
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
}

const logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
}


module.exports = {
  login,
  authenticate,
  register,
  logout
}