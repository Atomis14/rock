<template>
  <transition-group tag="div" name="notification" class="NotificationWrapper" appear>
    <Notification
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
    />
  </transition-group>
</template>

<script> 
import { mapGetters } from 'vuex';
import Notification from '../components/Notification.vue';

export default {
  name: 'NotificationWrapper',

  components: {
    Notification,
  },

  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
    }),
  },
};
</script>

<style lang="scss" scoped>
.NotificationWrapper {
  position: absolute;
  right: 60px;
  bottom: 40px;
  width: 350px;
  @include sm {
    right: 10px;
    left: 10px;
    bottom: 20px;
    width: auto;
  }
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
.notification-enter-to {
  opacity: 1;
  transform: translateY(0px) scale(1);
}
.notification-enter-active {
  transition: all 0.4s ease;
}

.notification-leave-from {
  opacity: 1;
  transform: scale(1);
}
.notification-leave-to {
  opacity: 0;
}
.notification-leave-active {
  transition: all 0.4s ease;
}

.notification-move {
  transition: all 0.4s ease;
}
</style>