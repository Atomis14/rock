<template>
  <div class="PostItem__message">
    <p class="PostItem__messageContent">{{ message.content }}</p>
    <p>by: <strong>{{ message.user.username }}</strong></p>
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
import { postsAPI } from '../services/posts.service.js';
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
      required: true
    }
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
        this.$parent.getPosts();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.PostItem {
  &__message {
    border: 1px solid black;
    background-color: white;
    margin: 25px;
    padding: 10px;
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