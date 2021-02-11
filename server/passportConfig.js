const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //eine Strategy ist eine Art, sich zu authentifizieren (local bedeute Username und Passwort)
const bcrypt = require('bcryptjs');
const User = require('./models/user.model.js');

const initialize = () => {
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
}

module.exports = initialize;