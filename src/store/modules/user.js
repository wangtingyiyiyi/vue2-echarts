
import { loginApi, cmsLogin, logOut } from '@/api/login.js'
import { SET_TOKEN, SET_USER_NAME, SET_USER_TYPE } from '../mutation'

const state = {
  token: '',
  userName: '',
  type: ''
}

const mutations = {
  [SET_TOKEN] (state, payload) {
    state.token = payload
  },
  [SET_USER_NAME] (state, payload) {
    state.userName = payload
  },
  [SET_USER_TYPE] (state, payload) {
    state.type = payload
  }
}

const actions = {
  // 账号密码登录
  async login ({ commit }, userInfo) {
    const res = await loginApi(userInfo)
    return new Promise((resolve, reject) => {
      if (res.code === 200) {
        commit('SET_TOKEN', res.result.token)
        commit('SET_USER_NAME', res.result.username)
        commit('SET_USER_TYPE', res.result.level.toString())
        sessionStorage.setItem('token', res.result.token)
        sessionStorage.setItem('userName', res.result.username)
        sessionStorage.setItem('type', res.result.level)
        resolve()
      } else {
        reject(res)
      }
    })
  },
  // cms用户从tmall icon 登录
  async cmsLogin ({ commit }, userId) {
    const res = await cmsLogin(userId)
    return new Promise((resolve, reject) => {
      if (res.code === 200) {
        commit('SET_TOKEN', res.result.token)
        commit('SET_USER_NAME', res.result.username)
        commit('SET_USER_TYPE', res.result.level.toString())
        sessionStorage.setItem('token', res.result.token)
        sessionStorage.setItem('userName', res.result.username)
        sessionStorage.setItem('type', res.result.level)
        resolve()
      } else {
        reject(res)
      }
    })
  },
  // 退出登录
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
