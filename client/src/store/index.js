import { createStore, createLogger } from 'vuex';
//import { create } from '../../../server/user.model';
import auth from './auth';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    plugins: [createLogger()]
  },
  plugins: [createLogger()]
});
