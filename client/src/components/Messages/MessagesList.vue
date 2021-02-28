<template>
  <div class="MessagesList">
    <div class="MessagesList__messagesContainer">
      <p v-if="!messages">Loading ...</p>
      <template v-else-if="messages.length">
        <MessageItem
          v-for="message in messages"
          :key="message._id"
          :message="message"
        />
      </template>
      <p v-else>No messages received yet.</p>
    </div>
    <div class="MessagesList__detailContainer"></div>
  </div>
</template>

<script>
import { messagesAPI } from '@/services/api/messages.api.js';
import MessageItem from './MessageItem.vue';

export default {
  name: 'MessagesList',

  props: {
    type: {
      type: String,
      required: true,
    },
  },

  components: {
    MessageItem,
  },

  data() {
    return {
      messages: false,
    };
  },

  watch: {
    type: function (to, from) {
      this.messages = false;
      this.getMessages();
    },
  },

  methods: {
    getMessages() {
      messagesAPI
        .get('/' + this.type)
        .then((messages) => (this.messages = messages))
        .catch((err) => {});
    },
  },

  created() {
    this.getMessages();
  },
};
</script>

<style lang="scss" scoped>
.MessagesList {
  display: flex;
  &__messagesContainer {
    width: 40%;
  }
  &__detailContainer {
    width: 57%;
    margin-left: 3%;
  }
}
</style>