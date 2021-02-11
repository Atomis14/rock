import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//bei jedem Neuladen der Website wird die Store-Funktion auth/attempt aufgerufen
//dadurch bleibt man eingeloggt, weil das Cookie an den Server geschickt wird, der die Benutzer-Infos zurücksendet, die dann im globalen Store gespeichert werden
store.dispatch('auth/attempt').then(() => {
  createApp(App).use(store).use(router).mount('#app');  //erst wenn der API-Call fertig ist (also der Store Daten beinhaltet), wird die Website angezeigt (Flickern wird verhindert)
});
