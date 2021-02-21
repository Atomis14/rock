<template>
  <transition name="publicNav" appear>
    <div id="publicNav">
      <router-link to="/profile">About</router-link>
      <router-link
        to="/register"
        class="button button--outline"
        v-if="currentRoute.name == 'Login'"
        >Register</router-link
      >
      <router-link
        to="/login"
        class="button button--outline"
        v-if="currentRoute.name == 'Register'"
        >Login</router-link
      >
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PublicNav',

  computed: {
    currentRoute() {
      return this.$route;
    },
  }
};
</script>

<style lang="scss" scoped>
#publicNav {
  position: absolute;
  top: 40px;
  right: 60px;
  @include sm {
    right: 10px;
  }
  a {
    padding: 10px;
  }
}

.publicNav-enter-from,
.publicNav-leave-top {
  opacity: 0;
  transform: translateX(10px);
}
.publicNav-enter-active,
.publicNav-leave-active {
  transition: 0.6s all ease;
}
.publicNav-enter-to,
.publicNav-leave-from {
  opacity: 1;
}
</style>