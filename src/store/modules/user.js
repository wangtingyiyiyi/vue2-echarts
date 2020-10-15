
import { loginApi, cmsLogin } from '@/api/login.js'
import { SET_TOKEN } from '../mutation'

const state = {
}

const mutations = {
  [SET_TOKEN] (state, payload) {
    state.token = payload
  }
}

const actions = {
  // 账号密码登陆
  async login ({ commit }, userInfo) {
    const res = await loginApi(userInfo)
    return new Promise((resolve, reject) => {
      if (res.code === 200) {
        commit('SET_TOKEN', res.result.token)
        sessionStorage.setItem('token', res.result.token)
        resolve()
      } else {
        reject(res)
      }
    })
  },
  // cms用户从tmall icon 登陆
  async cmsLogin ({ commit }, userId) {
    const res = await cmsLogin(userId)
    return new Promise((resolve, reject) => {
      if (res.code === 200) {
        commit('SET_TOKEN', res.result.token)
        sessionStorage.setItem('token', res.result.token)
        resolve()
      } else {
        reject(res)
      }
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
