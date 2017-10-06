<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  background-image: url('./assets/background.jpg');
  width: auto;
  height: 100vh;
  background-size:100%;
}
</style>
