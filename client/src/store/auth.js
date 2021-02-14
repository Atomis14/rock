import { authAPI } from '../services/auth.service.js';

export default {
  namespaced: true,

  state: {
    user: null
  },

  getters: {
    user(state) {
      return state.user;
    }
  },

  mutations: {
    SET_USER(state, data) {
      state.user = data;
    }
  },

  actions: {
    async login({ dispatch }, credentials) {
      //const response = await axios.post('/auth/login', credentials);
      await authAPI.post('login', credentials);
      return dispatch('attempt');
    },

    async register({ dispatch }, credentials) {
      //const response = await axios.post('/auth/register', credentials);
      await authAPI.post('register', credentials);
      return dispatch('attempt');
    },

    async attempt({ commit }) {
      try {
        //const response = await axios.get('/auth/authenticate');
        const response = await authAPI.getAll();
        commit('SET_USER', response);
      } catch (err) {
        commit('SET_USER', null);
      }
    },

    logout({ commit }) {
      return authAPI.post('logout').then(() => {
        commit('SET_USER', null);
      });
    }
  }
};