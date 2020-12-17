
import { SET_SYS_COLLAPSED, SET_SYS_SCROLLTOP } from '../mutation'

const state = {
  collapsed: true,
  scrollTop: 0
}

const mutations = {
  [SET_SYS_COLLAPSED] (state, payload) {
    state.collapsed = payload
  },
  [SET_SYS_SCROLLTOP] (state, payload) {
    state.scrollTop = payload
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
