<template>
  <a href="/" class="MessagePreview">
    <div class="MessagePreview__info">
      <div class="MessagePreview__date">
        {{ new Date(message.createdAt).toLocaleString('fr-ch') }}
      </div>
      <div v-if="message.sender" class="MessagePreview__person">
        from: {{ message.sender.user.username }}
      </div>
      <div v-if="message.recipient" class="MessagePreview__person">
        to: {{ message.recipient.user.username }}
      </div>
    </div>
    <div class="MessagePreview__subject">{{ message.content }}</div>
  </a>
</template>

<script>
export default {
  name: 'MessagePreview',

  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      name: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.MessagePreview {
  display: flex;
  border-radius: $borderRadius-regular;
  background-color: white;
  box-shadow: $boxShadow-medium;
  padding: 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.4s ease;
  &:hover {
    text-decoration: none;
    box-shadow: $boxShadow-light;
  }
  &__info {
    width: 30%;
  }
  &__subject {
    width: 70%;
  }
}
</style>