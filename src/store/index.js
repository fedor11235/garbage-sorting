import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    score: 0,
    gameProcessed: false
  },
  mutations: {
    SCORE_INCREASE(state) {
        state.score ++
    },
    SCORE_DECREASE(state) {
        state.score --
    },
    SCORE_DEFAULT(state) {
      if (state.score === 0) return
      state.score = 0
    },
    GAME_START(state) {
      state.gameProcessed = true
    },
    GAME_STOP(state) {
      state.gameProcessed = false
    },
  },
  actions: {
  }
})