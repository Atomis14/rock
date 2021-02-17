<template>
  <div class="MessagePreview row">
    <div class="col-2">{{ new Date(message.createdAt).toLocaleString('fr-ch') }}</div>
    <div class="col-7">{{ message.content }}</div>
    <div class="col-3" v-if="message.sender">from: {{ message.sender.user.username }}</div>
    <div class="col-3" v-if="message.recipient">to: {{ message.recipient.user.username }}</div>
  </div>
</template>

<script>
export default {
  name: 'MessagePreview',

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      name: ''
    }
  }
};
</script>

<style lang="scss" scoped>
  .MessagePreview {
    border: 1px solid $color-primary;
    padding: 10px;
    margin-bottom: 5px;
    & > div:last-child {
      text-align: right;
    }
  }
</style>