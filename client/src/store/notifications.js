export default {
  namespaced: true,

  state: {
    notifications: []
  },

  getters: {
    notifications(state) {
      return state.notifications;
    }
  },

  mutations: {
    SET_NOTIFICATION(state, data) {
      state.notifications.push(data);
    },

    REMOVE_NOTIFICATION(state, id) {
      const index = state.notifications.findIndex(notification => notification.id == id);
      state.notifications.splice(index, 1); //removed 1 item beginning at index
    }
  },

  actions: {
    setNotification({ commit }, data) {
      return commit('SET_NOTIFICATION', data);
    },

    removeNotification({ commit }, id) {
      setTimeout(() => {
        return commit('REMOVE_NOTIFICATION', id);
      }, 1000);
    }
  }
};