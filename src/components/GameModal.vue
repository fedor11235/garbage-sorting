<template>
<div class="modal" >
    <h1>Your game score: {{score}}</h1>
    <button @click="handlerStart" class="stopwatch__start"> Start </button>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import { mapMutations } from 'vuex'
export default {
  name: 'GameModal',
  computed: {
    ...mapState(['gameProcessed', 'score'])
  },
  methods: {
    ...mapMutations({
      gameStart: 'GAME_START',
      scoreDefault: 'SCORE_DEFAULT'
    }),
    handlerStart() {
        this.gameStart()
        this.scoreDefault()
    }
  }
}
</script>

<style scoped>

.modal {
    display: flex;
    flex-direction: column;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
}
.stopwatch__start {
    cursor: pointer;
    background-color: #fdfdfd;
    width: 100px;
    height: 40px;
    font-size: 21px;
    font-weight: 500;
    border-radius: 12px;
    border: none;
    transition: background-color 400ms;
}
.stopwatch__start:hover {
    background-color: #929292;
}
</style>