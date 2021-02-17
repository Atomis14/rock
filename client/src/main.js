import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

store.dispatch('auth/attempt').then(() => {
  createApp(App).use(store).use(router).mount('#app');
});
