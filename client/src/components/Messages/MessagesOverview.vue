<template>
  <div class="MessagesOverview">
    <div class="MessagesOverview__newMessageContainer">
      <h2>New message</h2>
      <form @submit.prevent="submitForm">
        <select v-model="form.recipient">
          <option value="" disabled selected>Recipient</option>
          <option v-for="user in users" :key="user._id" :value="user._id">
            {{ user.username }}
          </option>
        </select>
        <input type="text" placeholder="Subject" v-model="form.subject" />
        <textarea v-model="form.content" placeholder="Message"></textarea>
        <input type="submit" value="Send" />
        <p>{{ form.status }}</p>
      </form>
    </div>
    <div class="MessagesOverview__messagesContainer">
      <div class="MessagesOverview__messageGroupContainer">
        <h2>Last received messages</h2>
        <MessagePreview
          v-for="message in messages.receivedMessages"
          :key="message._id"
          :message="message"
        />
      </div>
      <div class="MessagesOverview__messageGroupContainer">
        <h2>Last sent messages</h2>
        <MessagePreview
          v-for="message in messages.sentMessages"
          :key="message._id"
          :message="message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { usersAPI } from '@/services/users.service.js';
import { messagesAPI } from '@/services/messages.service.js';
import MessagePreview from './MessagePreview.vue';

export default {
  name: 'MessagesOverview',

  components: {
    MessagePreview,
  },

  data() {
    return {
      form: {
        recipient: '',
        content: '',
        status: '',
      },
      users: {},
      messages: {},
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

    messagesAPI.get().then((messages) => (this.messages = messages));
  },
};
</script>

<style lang="scss" scoped>
.MessagesOverview {
  display: flex;
  h2 {
    margin-bottom: 20px;
    margin-left: 2px;
  }
  &__newMessageContainer {
    width: 40%;
    input,
    select,
    textarea {
      width: 100%;
      margin-bottom: 10px;
    }
    textarea {
      height: 250px;
    }
  }
  &__messagesContainer {
    float: right;
    margin-left: 3%;
    width: 57%;
  }
  &__messageGroupContainer {
    &:not(:first-child) {
      margin-top: 40px;
    }
  }
}
</style>