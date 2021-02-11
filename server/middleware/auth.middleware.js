const isAuthenticated = (req, res, next) => {   //Middleware, die überprüft, ob der User authentifiziert ist (also das Cookie auf dem Rechner hat) --> für skalierbarkeit in eigene Funktion auslagern
  if (req.isAuthenticated()) {  //isAuthenticated() ist eine passportjs-Funktion aber nirgends dokumentiert
    return next();
  }
  res.status(401).send('not authenticated');
}

module.exports = {
  isAuthenticated
}