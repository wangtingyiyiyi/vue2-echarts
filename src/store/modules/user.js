
import { loginApi } from '@/api/login.js'
import { SET_TOKEN } from '../mutation'

const state = {
}

const mutations = {
  [SET_TOKEN] (state, payload) {
    state.token = payload
  }
}

const actions = {
  async login ({ commit }, userInfo) {
    const res = await loginApi(userInfo)
    if (res.code === 200) {
      commit('SET_TOKEN', res.result.token)
      sessionStorage.setItem('token', res.result.token)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
