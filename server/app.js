/////////////node modules
const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

const app = express();

/////////////passport Setup

const initializePassport = require('./passportConfig.js');
initializePassport();

/////////////mongoDB Setup

const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster.32j3c.mongodb.net/rock?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

/////////////Middleware

//app.use(express.urlencoded({ extended: true })); //für Form-Anfragen aus einem HTML-Formular | extended-Parameter true erlaubt verschachtelte Daten (also Objekte in Objekten)
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new mongoStore({
    mongooseConnection: mongoose.connection, //vorhandene mongodb-Verbindung nutzen
    ttl: 1209600  //wie lange die Session gültig bleibt (hier: default 14 Tage, in Sekunden angegeben)
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

/////////////Route Handlers

const authRoutes = require('./routes/auth.routes.js');
const usersRoutes = require('./routes/users.routes.js');
const postsRoutes = require('./routes/posts.routes.js');
const messagesRoutes = require('./routes/messages.routes.js');

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/messages', messagesRoutes);

if (process.env.NODE_ENV === 'production') { //wenn App im Produktions nicht im Dev-Modus läuft wird statischer Ordner gesetzt
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (_, res) => res.sendFile(__dirname + '/public/index.html'));  //ungültige Routes werden an die index.html weitergeleitet
} else {
  app.use((_, res) => {
    res.status(404).send('invalid route');
  });
}