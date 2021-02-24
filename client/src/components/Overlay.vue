<template>
  <div class="Overlay">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <h3>Loading ...</h3>
  </div>
</template>

<script>
export default {
  name: 'Overlay'
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

.spinner {
  width: 100px;
  height: 100px;

  position: relative;
}
.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}
.double-bounce1 {
  background-color: rgba($color: $color-darkgrey, $alpha: 0.5);
}
.double-bounce2 {
  background-color: rgba($color: $color-darkgrey, $alpha: 0.5);
}
.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>