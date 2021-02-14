<template>
  <div class="Login">
    <h1>Register</h1>
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
      <input
        type="password"
        name="passwordRepeat"
        placeholder="Passwort wiederholen"
        v-model="form.passwordRepeat"
      /><br />
      <input type="submit" value="Login" />
      <p
        :class="[isError ? 'form__errorMessage' : 'form__successMessage']"
        v-if="statusMessage"
      >
        {{ statusMessage }}
      </p>
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
      isError: true,
      statusMessage: '',
    };
  },

  methods: {
    ...mapActions({
      register: 'auth/register',
    }),

    async submitForm() {
      this.register(this.form)
        .then(() => {
          this.statusMessage = 'successfully registered';
          this.isError = false;
          this.$router.replace('/dashboard');
        })
        .catch((err) => {
          this.isError = true;
          this.statusMessage = err.response.data;
        });
    },
  },
};
</script>