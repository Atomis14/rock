<template>
  <transition appear name="notification">
    <div class="Notification frosted frosted--shadow" v-show="showNotification">
      <i class="material-icons" v-if="notification.type == 'error'">error</i>
      <i class="material-icons" v-if="notification.type == 'success'">done</i>
      <span>{{ notification.message }}</span>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Notification',

  props: {
    notification: {
      type: Object,
    },
  },

  data() {
    return {
      showNotification: false,
    };
  },

  methods: {
    ...mapActions({
      removeNotification: 'notifications/removeNotification',
    }),
  },

  mounted() {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      //this.removeNotification(this.notification.id);
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
.Notification {
  padding: 10px 15px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  i {
    margin-right: 10px;
    align-self: flex-start;
    width: 25px;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s ease;
}

.notification-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.notification-leave-to {
  opacity: 0;
}
</style>