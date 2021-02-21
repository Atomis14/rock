<template>
  <div class="AuthForm frosted container">
    <img src="@/assets/img/logo.svg" alt="rock logo" />
    <p>Open source social network</p>
    <form class="form" @submit.prevent="submitForm">
      <input
        type="text"
        name="username"
        placeholder="Benutzername"
        v-model="form.username"
      />
      <input
        type="password"
        name="password"
        placeholder="Passwort"
        v-model="form.password"
      />
      <input
        type="password"
        name="passwordRepeat"
        placeholder="Passwort wiederholen"
        v-model="form.passwordRepeat"
      />
      <input type="submit" value="Register" />
    </form>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'register',

  data() {
    return {
      form: {
        username: '',
        password: '',
        passwordRepeat: '',
      },
    };
  },

  methods: {
    ...mapActions({
      register: 'auth/register',
    }),

    async submitForm() {
      this.register(this.form)
        .then(() => {
          this.$router.replace('/dashboard');
        })
        .catch((err) => {});
    },
  },
};
</script>