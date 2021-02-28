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
        <input type="submit" value="Send" class="buttonHover" />
        <p>{{ form.status }}</p>
      </form>
    </div>
    <div class="MessagesOverview__messagesContainer">
      <template v-if="messages">
        <div
          class="MessagesOverview__messageGroupOuter"
          v-for="(messageGroup, index) in messages"
          :key="index"
        >
          <h2>
            Last {{ index == 'receivedMessages' ? 'received' : 'sent' }} messages
          </h2>
          <div
            v-if="messageGroup.length"
            class="MessagesOverview__messageGroupInner"
          >
            <transition-group name="messageItem" mode="in-out">
              <MessageItem
                v-for="message in messageGroup"
                :key="message._id"
                :message="message"
                :options="true"
                @messageDeleted="messageDeleted"
              />
            </transition-group>
          </div>
          <p v-else>
            No messages
            {{ index == 'receivedMessages' ? 'received' : 'sent' }} yet.
          </p>
        </div>
      </template>
      <p v-else>Loading ...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { usersAPI } from '@/services/api/users.api.js';
import { messagesAPI } from '@/services/api/messages.api.js';
import MessageItem from './MessageItem.vue';

export default {
  name: 'MessagesOverview',

  components: {
    MessageItem,
  },

  data() {
    return {
      form: {
        recipient: '',
        subject: '',
        content: '',
      },
      users: [],
      messages: false,
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
        .post('', {
          recipientId: this.form.recipient,
          subject: this.form.subject,
          content: this.form.content,
        })
        .then(() => {
          this.form.recipient = '';
          this.form.subject = '';
          this.form.content = '';
        })
        .catch((err) => {});
    },

    messageDeleted(id) {
      this.messages.receivedMessages = this.messages.receivedMessages.filter(
        (message) => message._id != id
      );
      this.messages.sentMessages = this.messages.sentMessages.filter(
        (message) => message._id != id
      );
    },
  },

  created() {
    usersAPI.get().then((users) => {
      this.users = users.filter((elem) => {
        return elem._id !== this.user.id;
      });
    });

    messagesAPI.get('/latest').then((messages) => (this.messages = messages));
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
  &__messageGroupOuter {
    &:not(:first-child) {
      margin-top: 40px;
    }
  }
  &__messageGroupInner {
    position: relative;
  }

  .messageItem-enter-from {
    opacity: 0;
  }
  .messageItem-enter-active {
    transition: opacity 0.4s ease;
  }
  .messageItem-leave-active {
    transition: all 0.4s ease;
    position: absolute;
  }
  .messageItem-leave-to {
    opacity: 0;
    transform: scale(0.6);
  }
  .messageItem-move {
    transition: all 0.4s ease;
  }
}
</style>