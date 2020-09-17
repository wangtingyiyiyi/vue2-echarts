import { SET_BRAND_BRANDS, SET_BRAND_CATEGORY } from '../mutation'

const state = {
  brandList: [],
  categoryId: []
}

const mutations = {
  [SET_BRAND_BRANDS] (state, payload) {
    state.brandList = [...payload]
  },
  [SET_BRAND_CATEGORY] (state, payload) {
    state.categoryId = payload
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
