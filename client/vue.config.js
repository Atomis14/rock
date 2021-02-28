const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'), //damit die Build-Version des Frontends in den Public-Ordner des Backends kopiert wird
  devServer: {  //wenn in der Dev-Version (nicht Build-Version) gearbeitet wird, vor alle Routes die mit /api anfangen noch localhost:3000 setzen
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  css: {  //Optionen, um separate zusätzliche Scss-Files zu importieren (nicht alles Styling in den Components selbst sein muss)
    loaderOptions: {
      sass: { //@ ist eine Alias für den src-Ordner
        additionalData: `
          @import "@/styles/definitions.scss";
          @import "@/styles/mixins.scss";
          @import "@/styles/main.scss";
        `
      }
    }
  }
}