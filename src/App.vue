<template>
  <GameScene/>
</template>

<script>
import GameScene from './components/GameScene.vue'

export default {
  name: 'App',
  components: {
    GameScene
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #333333;
  height: 100vh;
  width: 100vw;
}
</style>
