<template>
  <div>
    <div id="nav">
      <template v-if="!user">
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
      </template>
      <template v-else>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/wall">Wall</router-link>
        <router-link to="/messages">Messages</router-link>
        <router-link to="/cloud">Cloud</router-link>
      </template>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 10px;
    &.router-link-exact-active {
      color: $color-primary;
      border-bottom: 2px solid $color-primary;
    }
  }
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}

</style>
