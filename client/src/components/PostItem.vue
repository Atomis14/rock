<template>
  <div class="PostItem__message frosted" v-if="user">
    <p class="PostItem__messageContent">{{ message.content }}</p>
    <p>
      by: <strong>{{ message.user.username }}</strong>
    </p>
    <a
      @click="deletePost"
      :data-id="message._id"
      v-if="message.user._id === user.id"
    >
      Delete
    </a>
  </div>
</template>

<script>
import { postsAPI } from '../services/api/posts.api.js';
import { mapGetters } from 'vuex';

export default {
  name: 'PostItem',

  props: {
    message: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    deletePost(e) {
      const id = e.target.dataset.id;
      postsAPI.removeOne(id).then((res) => {
        this.$emit('deleted');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.PostItem {
  &__message {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 15px;
    background-color: white;
    margin: 25px;
    padding: 30px;
    width: calc(33.333333% - 50px);
    height: 200px;
    box-shadow: $boxShadow-medium;
    p {
      margin: 0;
    }
    a {
      color: $color-warning;
      //position: absolute;
    }
  }

  &__messageContent {
    white-space: break-spaces;
  }
}
</style>