<template>
  <a href="/" class="MessageItem">
    <div class="MessageItem__info">
      <div class="MessageItem__date">
        {{ messageDate }}
      </div>
      <div v-if="message.sender" class="MessageItem__person">
        From: {{ message.sender.user.username }}
      </div>
      <div v-if="message.recipient" class="MessageItem__person">
        To: {{ message.recipient.user.username }}
      </div>
    </div>
    <div>
      <div class="MessageItem__subject">{{ message.subject }}</div>
      <div class="MessageItem__preview">{{ messagePreview }}</div>
    </div>
    <a
      v-if="options"
      @click.prevent="showOptions"
      class="MessageItem__optionButton"
    >
      <transition name="optionsButton">
        <i class="material-icons" v-if="!optionsVisible">more_horiz</i>
        <i class="material-icons" v-else>close</i>
      </transition>
    </a>
    <transition name="options">
      <div v-if="optionsVisible" class="MessageItem__options" @click.prevent>
        <a class="buttonHover" @click.prevent="deleteMessage">
          <i class="material-icons">delete</i>
          <span>Delete</span>
        </a>
        <a class="buttonHover" @click.prevent="archiveMessage">
          <i class="material-icons">archive</i>
          <span>Archive</span>
        </a>
        <a class="buttonHover" @click.prevent="readMessage">
          <i class="material-icons">mark_email_read</i>
          <span>Read</span>
        </a>
      </div>
    </transition>
  </a>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { messagesAPI } from '@/services/api/messages.api.js';

export default {
  name: 'MessageItem',

  props: {
    message: {
      type: Object,
      required: true,
    },
    options: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      name: '',
      optionsVisible: false,
    };
  },

  computed: {
    messageDate() {
      const messageDate = this.message.createdAt;
      if (dayjs().diff(messageDate, 'day') <= 7) {
        return dayjs(messageDate).fromNow();
      } else {
        return dayjs(messageDate).format('DD.MM.YYYY');
      }
    },
    messagePreview() {
      if (this.message.content.length <= 100) {
        return this.message.content;
      } else {
        return this.message.content.substring(0, 100) + '...';
      }
    },
  },

  methods: {
    dayjs,

    showOptions() {
      this.optionsVisible = !this.optionsVisible;
    },

    deleteMessage() {
      messagesAPI
        .removeOne(this.message._id)
        .then(() => {})
        .catch((err) => {});
      this.$emit('messageDeleted', this.message._id);
    },

    archiveMessage() {
      console.log('archived');
    },

    readMessage() {
      console.log('read');
    },
  },

  created() {
    dayjs.extend(relativeTime);
  },
};
</script>

<style lang="scss" scoped>
.MessageItem {
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: $borderRadius-regular;
  background-color: white;
  box-shadow: $boxShadow-medium;
  padding: 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.4s ease;
  width: 100%;
  &:hover {
    text-decoration: none;
    box-shadow: $boxShadow-light;
  }
  &__info {
    //width: 40%;
    margin-right: 5%;
    flex-shrink: 0;
  }
  &__subject {
    font-weight: $font-weight-bold;
  }
  &__optionButton {
    margin-left: auto;
    position: relative;
    z-index: 1;
    min-width: 25px;
    i {
      position: absolute;
    }
  }

  &__options {
    display: flex;
    position: absolute;
    background-color: rgba($color: white, $alpha: 0.8);
    backdrop-filter: blur(4px);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    border-radius: $borderRadius-regular;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 30px;
    }
  }

  .optionsButton-enter-from,
  .optionsButton-leave-to {
    opacity: 0;
  }
  .optionsButton-enter-active,
  .optionsButton-leave-active {
    transition: opacity 0.4s ease;
  }

  .options-enter-from,
  .options-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
  .options-enter-active,
  .options-leave-active {
    transition: all 0.4s ease;
  }
}
</style>