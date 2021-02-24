<template>
  <div class="Titlebar viewcontent frosted">
    <div class="Titlebar__submenu">
      <router-link
        v-for="(menuitem, index) in menu"
        :key="index"
        :to="{ name: menuitem.pathName }"
      >
        {{ menuitem.name }}
      </router-link>
    </div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Titlebar',

  props: {
    title: {
      type: String,
      required: true,
    },
    menu: {
      type: Object,
    },
  }
};
</script>

<style lang="scss" scoped>
.Titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 70px;
  background-color: green;
  position: sticky;
  top: 0;
  &__submenu {
    a {
      padding: 7px 15px 10px 15px;
      font-size: 2.2rem;
      font-family: $font-family-serif;
      transition: 0.4s ease;
      transition-property: background-color, color, opacity;
      position: relative;
      &:hover {
        text-decoration: none;
        opacity: 0.6;
      }
      &.router-link-exact-active {
        font-weight: $font-weight-bold;
        background-color: rgba($color: #000000, $alpha: 0.05);
        border-radius: 8px;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>