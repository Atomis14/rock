import { createStore, createLogger } from 'vuex';

import auth from './auth.js';
import notifications from './notifications.js';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    notifications,
    plugins: [createLogger()]
  },
  plugins: [createLogger()]
});
