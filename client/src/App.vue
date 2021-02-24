<template>
  <div class="app" :class="[!user ? 'public' : 'secure']">
    
    <Sidebar v-if="user" />

    <PublicNav v-else />

    <router-view v-slot="{ Component }">
      <transition
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <component :is="Component"></component>
      </transition>
    </router-view>

    <Notification-wrapper />
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import gsap from 'gsap';
import NotificationWrapper from './components/NotificationWrapper.vue';
import PublicNav from './components/PublicNav.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  data() {
    return {};
  },

  components: {
    NotificationWrapper,
    PublicNav,
    Sidebar
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    beforeEnter(el) {
      gsap.from(el, { opacity: 0, x: -20 });
    },
    enter(el, done) {
      gsap.to(el, { opacity: 1, x: 0, duration: 0.5, onComplete: done });
    },
    leave(el, done) {
      gsap.to(el, { opacity: 0, x: 20, duration: 0.5, onComplete: done });
    },
  },
};
</script>


<style lang="scss">
.app {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  transition: background-color 1s ease;
  &::after {
    opacity: 0;
    transition: all 1s ease;
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
        45deg,
        rgba($color-mint, 0.35) 0%,
        rgba($color-violet, 0.35) 100%
      ),
      url('~@/assets/img/background-compressed.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
  &.public {
    &::after {
      opacity: 1;
    }
  }
}
</style>
