import {
  FILE_CURRENT_TAB
} from '../mutation'

const state = {
  currentTabPane: ''
}

const mutations = {
  [FILE_CURRENT_TAB] (state, payload) {
    state.currentTabPane = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
