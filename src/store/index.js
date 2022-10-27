import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    score: 0
    // помещаем сюда переменные и собираем их
  },
  mutations: {
    SCORE_INCREASE(state) {
        state.score ++
    },
    SCORE_DECREASE(state) {
        state.score --
    },
  },
  actions: {
  }
})