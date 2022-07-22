import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utail'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明存储token的变量
    user: getToken() || {},
    article_id: ''
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload
      setToken(payload)
    }
  }
})
