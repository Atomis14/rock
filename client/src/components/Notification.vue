<template>
  <div class="Notification frosted frosted--shadow" v-show="showNotification">
    <i class="material-icons" v-if="notification.type == 'error'">error</i>
    <i class="material-icons" v-if="notification.type == 'success'">done</i>
    <span>{{ notification.message }}</span>
  </div>
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
      showNotification: true,
    };
  },

  methods: {
    ...mapActions({
      removeNotification: 'notifications/removeNotification',
    }),
  },

  mounted() {
    setTimeout(() => {
      this.showNotification = false;
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
  width: 100%;
  i {
    margin-right: 10px;
    align-self: flex-start;
  }
}
</style>