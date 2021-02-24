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
import MessagesOverview from '../components/Messages/MessagesOverview.vue';
import MessagesList from '../components/Messages/MessagesList.vue';

export default {
  components: {
    Titlebar,
    //MessagesOverview,
    //MessagesList,
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
.Messages {
}
</style>