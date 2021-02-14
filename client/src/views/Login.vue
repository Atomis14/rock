<template>
  <div class="Login">
    <h1>Login</h1>
    <form class="form" @submit.prevent="submitForm">
      <input
        type="text"
        name="username"
        placeholder="Benutzername"
        v-model="form.username"
      /><br />
      <input
        type="password"
        name="password"
        placeholder="Passwort"
        v-model="form.password"
      /><br />
      <input type="submit" value="Login" />
      <p :class="[isError ? 'form__errorMessage' : 'form__successMessage']">
        {{ statusMessage }}
      </p>
    </form>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  //components: {},
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      isError: true,
      statusMessage: '',
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
          //wenn das Promise von login fertig ist, wird auf /secured umgeleitet
          this.$router.replace('/dashboard'); //mit replace erscheint die vorherige Seite nicht im Verlauf
        })
        .catch((err) => {  //Fehlermeldung für den User falls Login nicht geklappt hat
          this.isError = true;
          this.statusMessage = err.response.data;
        });
    },
  },
};
</script>