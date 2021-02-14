<template>
  <div class="Wall">
    <h1>Wall</h1>
    <p>Public messages</p>
    <form @submit.prevent="submitForm">
      <textarea v-model="form.content"></textarea>
      <br />
      <input type="submit" value="Post" />
      <p>{{ form.error }}</p>
    </form>
    <div class="Wall__messageContainer">
      <template v-if="messages">
        <div
          class="Wall__message"
          v-for="(message, index) in messages"
          :key="index"
        >
          <p>{{ message.content }}</p>
          <p>by: {{ message.user.username }}</p>
          <a
            @click="deletePost"
            :data-id="message._id"
            v-if="message.user._id === user.id"
          >
            Delete
          </a>
        </div>
      </template>
      <template v-else>
        <p>Could not fetch any posts</p>
      </template>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { postsAPI } from '../services/posts.service.js';

export default {
  data() {
    return {
      form: {
        content: '',
        error: '',
      },
      messages: null,
    };
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    submitForm() {
      if (this.form.content == '') {
        this.form.error = 'please fill in a message';
        return;
      }
      postsAPI
        .post({ content: this.form.content })
        .then(() => {
          this.form.content = '';
          this.form.error = '';
          this.getPosts();
        })
        .catch((err) => {
          console.log(err);
          this.form.error = 'please fill in a message';
        });
    },

    deletePost(e) {
      const id = e.target.dataset.id;
      postsAPI.removeOne(id).then((res) => {
        this.getPosts();
      });
    },

    getPosts() {
      postsAPI
        .get()
        .then((res) => {
          this.messages = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getPosts();
  },
};
</script>


<style lang="scss" scoped>
.Wall {
  textarea {
    width: 250px;
    height: 100px;
  }

  &__messageContainer {
    display: flex;
    flex-wrap: wrap;
  }

  &__message {
    margin: 10px;
    padding: 10px;
    width: calc(25% - 20px);
    border: 1px solid black;
    background-color: white;

    a {
      color: $color-warning;
    }
  }
}
</style>