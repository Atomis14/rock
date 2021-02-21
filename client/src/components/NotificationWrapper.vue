<template>
  <div class="NotificationWrapper">
    <Notification
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
    />
  </div>
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
</style>