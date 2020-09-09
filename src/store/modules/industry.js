import { SET_INDUSTRY_CATEGORY } from '../mutation'
const state = {
  categoryObj: {
    id: '',
    label: '',
    remark: ''
  }
}

const mutations = {
  [SET_INDUSTRY_CATEGORY] (state, payload) {
    state.categoryObj = { ...payload }
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
