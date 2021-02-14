# Rock

Eine Art soziales Netzwerk, basierend auf einer Umsetzung von 2015 ("Coloss", damals mit MySQL und PHP).

Projektstart: 10.02.2021

## Server im Produktionsmodus starten

Der `master`-Branch ist der Haupt-Branch für die Entwicklung. Fertige Versionen sind im `release`-Branch mit einem Tag gekennzeichnet.

Commits mit einem Versionstag `vX.X` sind ohne Frontend-Dev-Server lauffähig.  

Gegensatz zu den nicht getaggten Versionen sind bei getaggten Versionen der `node_modules`-Ordner des Servers vorhanden sowie im `public`-Ordner die statischen HTML, CSS und JS-Files, die aus dem `client`-Ordner exportiert wurden.

Der Server kann mit `npm run start` gestartet werden, die Website ist unter http://localhost:3000/ erreichbar. Node.js muss installiert sein.

## Datenbank

Als Datenbank wird mongoDB verwendet.  

**Struktur**

```
rock             [DB-Name]
└───users        [collection]
└───sessions     [collection, automatisch von connect-mongo erstellt]
└───posts        [collection]
```

Momentan auf mongoDB Atlas gehostet, kann aber auch mit lokaler Datenbank gemacht werden (Anpassungen beim beim mongoDB Setup nötig).

## .env-Files

**Server**

Für die korrekte Funktion des Backend-Servers ist eine .env-Datei mit folgendem Inhalt auf gleicher Ebene wie package.json nötig:

```
MONGODB_USER=<benutzer für mongodb atlas>
MONGODB_PASSWORD=<passwort für mongodb atlas>
SESSION_SECRET=<irgend ein random string>
```

**Client**

Im `client`-Ordner ist auf der obersten Ebene eine `.env`-Datei mit folgendem Inhalt nötig (evtl. ist diese nicht im Repository vorhanden):

```
VUE_APP_TITLE=Authentication Templates
```

In dieser Environment-Variable ist der Seitentitel gespeichert.