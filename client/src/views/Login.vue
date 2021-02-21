<template>
  <div class="AuthForm frosted">
    <img src="@/assets/img/logo.svg" alt="rock logo" />
    <p>Open source social network</p>
    <form class="form" @submit.prevent="submitForm">
      <input
        type="text"
        name="username"
        placeholder="Username"
        v-model="form.username"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="form.password"
      />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),

    async submitForm() {
      this.login(this.form)
        .then((res) => {
          this.isError = false;
          this.statusMessage = 'successfully logged in';
          this.$router.replace('/dashboard');
        })
        .catch((err) => {});
    },
  },
};
</script>