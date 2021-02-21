<template>
  <div class="AuthForm">
    <div class="AuthForm__box frosted">
      <img src="@/assets/img/logo.svg" alt="rock logo" />
      <p>Open source social network</p>
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
        <input type="submit" :value="buttonName" />
        <p :class="[isError ? 'form__errorMessage' : 'form__successMessage']">
          {{ statusMessage }}
        </p>
      </form>
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      isError: true,
      statusMessage: ''
    };
  },

  computed: {
    buttonName() {
      if(this.type == 'loginForm') {
        return 'Login'
      } else {
        return 'Register'
      }
    }
  },

  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.AuthForm {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  font-weight: $font-weight-normal;
  &__box {
    padding: 30px;
    margin: 10px;
    border-radius: 15px;
    min-width: 350px;
    input[type='text'],
    input[type='password'] {
      width: 100%;
      margin-bottom: 10px;
      border: 2px solid rgba(white, 0.5);
      background-color: transparent;
      transition: background-color 0.4s ease;
      &::placeholder {
        font-weight: $font-weight-normal;
        color: rgba($color-darkgrey, 0.8);
      }
      &:focus {
        background-color: rgba(white, 0.6);
      }
    }
    input[type='submit'] {
      width: 100%;
    }
  }
}
</style>