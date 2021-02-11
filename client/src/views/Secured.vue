<template>
  <div>
    <h1>Secured</h1>
    <template v-if="user">
      <h2>Hello, {{ user.username }}</h2>
      <p><b>Account created:</b> {{ new Date(user.createdAt).toLocaleString('fr-ch') }}</p>
    </template>
    <a href="#" @click="logout">Logout</a>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    ...mapActions({
      //Funktion aus dem Store importieren
      logoutAction: 'auth/logout',
    }),

    logout() {
      this.logoutAction().then(() => {
        this.$router.replace('/login');
      });
    },
  },
};
</script>