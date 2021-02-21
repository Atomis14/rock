<template>
  <transition appear name="sidebar">
    <div class="Sidebar">
      <router-link to="/dashboard" class="Sidebar__logoLink">
        <img
          src="@/assets/img/logo.svg"
          alt="rock logo"
          class="Sidebar__logo"
        />
      </router-link>
      <div class="Sidebar__links">
        <router-link to="/dashboard">
          <i class="material-icons">home</i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/wall">
          <i class="material-icons">dashboard</i>
          <span>Wall</span>
        </router-link>
        <router-link to="/messages">
          <i class="material-icons">message</i>
          <span>Messages</span>
        </router-link>
        <router-link to="/cloud">
          <i class="material-icons">cloud</i>
          <span>Cloud</span>
        </router-link>
      </div>

      <div class="Sidebar__options">
        <div class="Sidebar__profileContainer">
          <router-link to="/profile">
            <img
              src="@/assets/img/dummyprofilepic.jpg"
              alt="profile picture"
              class="Sidebar__profilePicture"
            />
          </router-link>
          <div>
            <router-link to="/profile" class="Sidebar__username">
              <template v-if="user.fullname">{{ user.fullname }}</template>
              <template v-else>{{ user.username }}</template>
            </router-link>
            <router-link to="/settings" class="Sidebar__editLink">
              <i class="material-icons">edit</i>
              Edit profile
            </router-link>
          </div>
        </div>
        <a href="#" @click.prevent="logout" class="Sidebar__logoutLink">
          <i class="material-icons">logout</i>
        </a>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Sidebar',

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    ...mapActions({
      logoutAction: 'auth/logout',
    }),

    logout() {
      this.logoutAction().then(() => {
        this.$router.replace('/login');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  height: 100vh;
  width: 330px;
  background: linear-gradient(
    45deg,
    rgba($color-mint, 0.25) 0%,
    rgba($color-violet, 0.25) 100%
  );

  &__logoLink {
    width: 70%;
    margin: 50px auto -50px auto;
  }

  &__links {
    a {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 20px 30px;
      font-weight: bold;
      color: $color-darkgrey;
      transition: all 0.4s ease;
      font-weight: bold;
      text-decoration: none;
      &:hover {
        opacity: 0.6;
      }
      span {
        font-size: 2.5rem;
      }
      i {
        font-size: 3rem;
        margin-right: 15px;
        color: black;
      }
      &.router-link-exact-active {
        background-color: rgba(white, 0.3);
      }
    }
  }

  &__options {
    margin: 30px;
    display: flex;
    justify-content: space-between;

  }
  &__profileContainer {
    display: flex;
  }
  &__profilePicture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  &__username {
    font-size: 2rem;
  }
  &__editLink {
    display: flex;
    align-items: center;
    margin-top: 5px;
    i {
      font-size: 1.8rem;
      margin-right: 5px;
    }
  }
  &__logoutLink {
    display: flex;
    align-items: center;
    align-self: flex-start;
    justify-self: flex-end;
    transition: opacity .4s ease;
    i {
      font-size: 2.1rem;
    }
    &:hover {
      opacity: 0.6;
    }
  }
}

.sidebar-enter-from,
.sidebar-leave-top {
  opacity: 0;
  transform: translateX(-20px);
}
.sidebar-enter-active,
.sidebar-leave-active {
  transition: 0.5s all ease;
}
.sidebar-enter-to,
.sidebar-leave-from {
  opacity: 1;
}
</style>