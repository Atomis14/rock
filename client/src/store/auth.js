import axios from 'axios';
//import { registerRuntimeCompiler } from 'vue';

export default {
  namespaced: true,

  state: {
    user: null
  },

  getters: {  //mit getters kann man Informationen aus dem Store holen (funktioniert mit composition api anders)
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
      const response = await axios.post('/api/auth/login', credentials);
      return dispatch('attempt');   //dispatch gibt ein Promise zurück, im Code wo man login aufgerufen hat, kann man warten und wenn alles fertig ist redirected.
    },

    async register({ dispatch }, credentials) {
      //!!!VERSTÄNDNISPROBLEM: wieso wird bei einem Fehler (bei await axios.post) das return dispatch nicht ausgeführt?! irgendwie wird axios.post direkt returned...
       //in Register.vue gibt es an dieser Axios-Funktion ein .then und .catch, die das Error-Handling dafür übernehmen
      const response = await axios.post('/api/auth/register', credentials); //bei dieser Schreibweise wird bei einem Fehler die nächste Zeile nicht ausgeführt
      /* axios.post('/api/register', credentials) //bei dieser Schreibweise funktioniert alles wie erwartet
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        }); */
      return dispatch('attempt');
    },

    async attempt({ commit }) {
      try {
        const response = await axios.get('/api/auth/authenticate');
        commit('SET_USER', response.data);
      } catch (err) {
        commit('SET_USER', null);
      }
    },

    logout({ commit }) {
      return axios.post('/api/auth/logout').then(() => {
        commit('SET_USER', null);
      });
    }
  }
};