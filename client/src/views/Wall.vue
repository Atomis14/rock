<template>
  <transition-group name="wallstate" tag="div" class="Wall view">
    <div class="Wall__messageContainer" v-if="loadingComplete">
      <form @submit.prevent="submitForm" class="Wall__createContainer">
        <textarea v-model="form.content"></textarea>
        <br />
        <input type="submit" value="Post" />
      </form>
      <transition-group
        v-if="messages"
        appear
        @beforeEnter="beforeEnter"
        @enter="enter"
      >
        <PostItem
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
          :index="index"
          :data-index="index"
          class="PostItem"
          @deleted="getPosts"
        />
      </transition-group>
      <h1 v-else-if="loadingComplete && !messages && !loadingError">
        There aren't any messages yet.
      </h1>
      <h1 v-else-if="loadingError">
        Could not load messages. Please try later.
      </h1>
    </div>
    <Overlay v-else />
  </transition-group>
</template>


<script>
import { mapGetters } from 'vuex';
import { postsAPI } from '../services/posts.service.js';
import gsap from 'gsap';
import PostItem from '../components/PostItem.vue';
import Overlay from '../components/Overlay.vue';

export default {
  components: {
    PostItem,
    Overlay
  },

  data() {
    return {
      form: {
        content: '',
      },
      messages: null,
      loadingComplete: false,
      loadingError: false,
    };
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    submitForm() {
      postsAPI
        .post({ content: this.form.content })
        .then(() => {
          this.form.content = '';
          this.form.error = '';
          this.getPosts();
        })
        .catch((err) => {});
    },

    getPosts() {
      postsAPI
        .get()
        .then((res) => {
          this.messages = res;
          this.loadingComplete = true;
        })
        .catch((err) => {
          this.loadingError = true;
          this.loadingComplete = true;
          console.log(err);
        });
    },

    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(100px)';
    },
    
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        onComplete: done,
        delay: el.dataset.index * 0.04
      })
    }
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
    width: calc(100% + 50px);
    margin-left: -25px;
    min-height: 100%;
  }

  &__createContainer {
    width: calc(33.3333333% - 50px);
    max-height: 200px;
    margin: 25px;
    textarea {
      width: 100%;
      height: 70%;
      resize: none;
    }
    input[type='submit'] {
      float: right;
    }
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

.wallstate-enter-from,
.wallstate-leave-to {
  opacity: 0;
  //transform: translateY(20px);
}
.wallstate-enter-to,
.wallstate-leave-from {
  opacity: 1;
  //transform: translateY(0px);
}
.wallstate-enter-active {
  transition: all 0.4s ease;
}
.wallstate-leave-active {
  transition: all 0.4s ease;
}
</style>