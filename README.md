# vue

Modifizierte Authentifizierungs-API aus Branch passportjs-mongodb  

Features
- einfache Authentifizierung mit Passport.js
- Frontend mit Vue.js (inkl. Vuex und Vue router)
- Benutzer werden in einer mongoDB-Datenbank gespeichert
- Passwörter werden mit bcryptjs verschlüsselt
- Benutzer wird nach Registration direkt eingeloggt
- 404 Page
- Benutzer bleibt bei Reload der Seite eingeloggt
- eigene Fehlermeldungen

Anmerkungen
- Composition-API nicht verwendet, da zu wenige Lernressourcen
- Das Backend ist nicht 1:1 von passportjs-mongodb übernommen, es gibt einige wichtige Unterschiede

Unterschiede zum mongodb-passportjs-Backend
- Der Code ist in strukturierter und in verschiedene Files aufgeteilt
- zusätzliche Route /authentication

## node_modules für client Ordner

Auf Windows muss evtl. noch der command `npm install --global windows-build-tools` von einer Adminstrator-Powershell installiert werden, damit `npm install` funktioniert.

## mongoDB Konfiguration

Datenbank mit folgender Strukur:
```
testdb           [DB-Name]
└───users        [collection]
```
Momentan auf mongoDB Atlas verfügbar, kann aber auch mit lokaler Datenbank gemacht werden (Anpassungen beim beim mongoDB Setup nötig).
Der Cluster auf mongoDB Atlas heisst einfach "cluster".

## .env-Files

**Server**  
Für die korrekte Funktion des Backend-Servers ist eine .env-Datei mit folgendem Inhalt auf gleicher Ebene wie package.json nötig:
```
MONGODB_USER=<benutzer für mongodb atlas>
MONGODB_PASSWORD=<passwort für mongodb atlas>
SESSION_SECRET=<irgend ein random string>
```

**Client**  
Im "client"-Ordner ist auf der obersten Ebene eie .env-Datei mit folgendem Inhalt nötig (evtl. ist diese nicht im Repository vorhanden):
```
#.env-Keys für Vue-App müssen mit VUE_APP anfangen
#alle Änderungen hier erfordern einen Server-Restart
VUE_APP_TITLE=Authentication Templates
```
In dieser Environment-Variable ist der Seitentitel gespeichert.