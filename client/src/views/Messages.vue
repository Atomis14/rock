<template>
  <div class="Messages view">
    <Titlebar title="Messages" :menu="menu" />
    <div class="viewcontent">
      <router-view />
    </div>
  </div>
</template>

<script>
import Titlebar from '../components/Titlebar.vue';

export default {
  components: {
    Titlebar,
  },

  data() {
    return {
      menu: {
        overview: {
          name: 'Overview',
          pathName: 'MessagesOverview'
        },
        received: {
          name: 'Received',
          pathName: 'MessagesReceived'
        },
        sent: {
          name: 'Sent',
          pathName: 'MessagesSent'
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>