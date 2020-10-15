
import { loginApi, cmsLogin, logOut } from '@/api/login.js'
import { SET_TOKEN, SET_USER_NAME } from '../mutation'

const state = {
  token: '',
  userName: ''
}

const mutations = {
  [SET_TOKEN] (state, payload) {
    state.token = payload
  },
  [SET_USER_NAME] (state, payload) {
    state.userName = payload
  }
}

const actions = {
  // 账号密码登陆
  async login ({ commit }, userInfo) {
    const res = await loginApi(userInfo)
    return new Promise((resolve, reject) => {
      if (res.code === 200) {
        commit('SET_TOKEN', res.result.token)
        commit('SET_USER_NAME', res.result.username)
        sessionStorage.setItem('token', res.result.token)
        sessionStorage.setItem('userName', res.result.username)
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
        commit('SET_USER_NAME', res.result.username)
        sessionStorage.setItem('token', res.result.token)
        sessionStorage.setItem('userName', res.result.username)
        resolve()
      } else {
        reject(res)
      }
    })
  },
  // 退出登陆
  async logOut ({ commit, state }) {
    const res = await logOut({ token: state.token })
    return new Promise((resolve, reject) => {
      if (res.code === 200) {
        commit('SET_TOKEN', '')
        commit('SET_USER_NAME', '')
        sessionStorage.clear()
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
