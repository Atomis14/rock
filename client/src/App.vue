<template>
  <div class="app" :class="[!user ? 'public' : 'secure']">
    <transition name="sidebar">
      <Sidebar v-if="user" />
      <PublicNav v-else />
    </transition>
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
    return {
      transitionType: 'slide',
    };
  },

  components: {
    NotificationWrapper,
    PublicNav,
    Sidebar,
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  watch: {
    $route(to, from) {
      const fromProtected = from.meta.protectedRoute;
      const toProtected = to.meta.protectedRoute;
      if (!fromProtected && !toProtected) {
        this.transitionType = 'slide';
      } else if (
        (!fromProtected && toProtected) ||
        (fromProtected && !toProtected)
      ) {
        this.transitionType = 'fade';
      } else {
        this.transitionType = 'none';
      }
    },
  },

  methods: {
    beforeEnter(el) {
      if (this.transitionType == 'slide') {
        gsap.from(el, { opacity: 0, x: -20 });
      } else if (this.transitionType == 'fade') {
        gsap.from(el, { opacity: 0 });
      }
    },
    enter(el, done) {
      if (this.transitionType == 'slide') {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.4, onComplete: done });
      } else if (this.transitionType == 'fade') {
        gsap.to(el, { opacity: 1, duration: 0.4, onComplete: done });
      } else {
        setTimeout(() => {
          done();
        }, 1);
      }
    },
    leave(el, done) {
      if (this.transitionType == 'slide') {
        gsap.to(el, { opacity: 0, x: 20, duration: 0.4, onComplete: done });
      } else if (this.transitionType == 'fade') {
        gsap.to(el, { opacity: 0, duration: 0.4, onComplete: done });
      } else {
        setTimeout(() => {
          done();
        }, 1);
      }
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

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.sidebar-enter-active {
  animation: slideIn 0.8s ease;
}
.sidebar-leave-active {
  transition: 0.5s all ease;
}
.sidebar-enter-to,
.sidebar-leave-from {
  opacity: 1;
}

@keyframes slideIn {
  0% {
    opacity: 0%;
  }
  50% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
