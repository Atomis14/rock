<template>
  <div class="Messages view">
    <h1>Messages</h1>
    <p>Private messages</p>
    <form @submit.prevent="submitForm">
      Send message to:
      <select v-model="form.recipient">
        <option v-for="user in users" :key="user._id" :value="user._id">
          {{ user.username }}
        </option>
      </select>
      <br /><br />
      <textarea v-model="form.content"></textarea><br />
      <input type="submit" value="Send" />
      <p>{{ form.status }}</p>
    </form>
    <div class="Messages__messagesContainer">
      <h3>received Messages</h3>
      <MessagePreview v-for="message in messages.receivedMessages" :key="message._id" :message="message" />
      <h3>sent Messages</h3>
      <MessagePreview v-for="message in messages.sentMessages" :key="message._id" :message="message" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { usersAPI } from '../services/users.service.js';
import { messagesAPI } from '../services/messages.service.js';
import MessagePreview from '../components/MessagePreview.vue';

export default {
  components: {
    MessagePreview
  },

  data() {
    return {
      form: {
        recipient: '',
        content: '',
        status: '',
      },
      users: {},
      messages: {}
    };
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    submitForm() {
      messagesAPI
        .post({
          recipientId: this.form.recipient,
          content: this.form.content,
        })
        .then(() => {
          this.form.recipient = '';
          this.form.content = '';
          this.form.status = 'message sent successfully';
        })
        .catch((err) => {
          this.form.status = err.response.data;
        });
    },
  },

  created() {
    usersAPI.get().then((users) => {
      this.users = users.filter((elem) => {
        return elem._id !== this.user.id;
      });
    });

    messagesAPI.get().then(messages => this.messages = messages);
  },
};
</script>

<style lang="scss" scoped>
  .Messages {
    
    &__messagesContainer {
      //border: 1px solid black;
    }

  }
</style>