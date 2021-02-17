<template>
  <div class="Wall view">
    <h1>Wall</h1>
    <p>Public messages</p>
    <form @submit.prevent="submitForm">
      <textarea v-model="form.content"></textarea>
      <br />
      <input type="submit" value="Post" />
      <p>{{ form.error }}</p>
    </form>
    <div class="Wall__messageContainer">
      <template v-if="allMessages">
        <div class="Wall__col">
          <PostItem
            v-for="(message, index) in messages.col1"
            :key="index"
            :message="message"
            :index="index"
            class="grid-item"
          />
        </div>
        <div class="Wall__col">
          <PostItem
            v-for="(message, index) in messages.col2"
            :key="index"
            :message="message"
            :index="index"
            class="grid-item"
          />
        </div>
        <div class="Wall__col">
          <PostItem
            v-for="(message, index) in messages.col3"
            :key="index"
            :message="message"
            :index="index"
            class="grid-item"
          />
        </div>
      </template>
      <p v-else>Could not fetch any posts</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { postsAPI } from '../services/posts.service.js';

import PostItem from '../components/PostItem.vue';

export default {
  components: {
    PostItem,
  },

  data() {
    return {
      form: {
        content: '',
        error: '',
      },
      allMessages: null,
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),

    messages() {
      return {
        col1: this.allMessages.filter((_, index) => {
          return index % 3 == 0;
        }),
        col2: this.allMessages.filter((_, index) => {
          return index % 3 == 1;
        }),
        col3: this.allMessages.filter((_, index) => {
          return index % 3 == 0;
        }),
      };
    },
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

    getPosts() {
      postsAPI
        .get()
        .then((res) => {
          this.allMessages = res;
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
  &__messageContainer {
    display: flex;
    flex-wrap: wrap;
  }

  &__col {
    width: 33%;
    @include md {
      width: 50%;
    }
    @include sm {
      width: 100%;
    }
  }
}
</style>