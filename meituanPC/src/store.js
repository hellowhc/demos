import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  position: {},
  user: null
}

const mutations = {
  setPosition (state, val) {
    state.position = val
  },
  setUser (state, val) {
    state.user = val
  },
}

const actions = {
  setPosition ({ commit }, val) {
    // 异步请求后端获取当前位置数据
    commit('setPosition', val)
  },
  setUser ({ commit }, val) {
    commit('setUser', val)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
