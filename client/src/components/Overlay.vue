<template>
  <div class="Overlay">
    <Spinner />
    <h3>Loading ...</h3>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  name: 'Overlay',

  components: {
    Spinner
  }
};
</script>

<style lang="scss" scoped>
.Overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: white, $alpha: 0.8);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  h3 {
    font-family: $font-family-serif;
  }
}
</style>