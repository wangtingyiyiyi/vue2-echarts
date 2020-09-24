
import { SET_SYS_COLLAPSED } from '../mutation'

const state = {
  collapsed: false
}

const mutations = {
  [SET_SYS_COLLAPSED] (state, payload) {
    state.collapsed = payload
  }
}

const actions = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
