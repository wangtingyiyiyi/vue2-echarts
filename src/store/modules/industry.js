import { SET_INDUSTRY_CATEGORY, SET_INDUSTRY_CATRGOTY_TABLE_PARAM } from '../mutation'
const state = {
  categoryObj: {
    id: '',
    label: '',
    remark: ''
  },
  cateTableParam: {}
}

const mutations = {
  [SET_INDUSTRY_CATEGORY] (state, payload) {
    state.categoryObj = { ...payload }
  },
  [SET_INDUSTRY_CATRGOTY_TABLE_PARAM] (state, payload) {
    state.cateTableParam = { ...payload }
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
