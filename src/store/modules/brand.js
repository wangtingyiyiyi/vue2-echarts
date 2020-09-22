import { SET_BRAND_BRANDS, SET_BRAND_CATEGORY, RESET_BRAND_BRANDS, RESET_BRAND_CATEGORY } from '../mutation'

const state = {
  brandList: [],
  categoryId: []
}

const mutations = {
  [SET_BRAND_BRANDS] (state, payload) {
    state.brandList = [...payload]
  },
  [RESET_BRAND_BRANDS] (state) {
    state.brandList = []
  },
  [SET_BRAND_CATEGORY] (state, payload) {
    state.categoryId = payload
  },
  [RESET_BRAND_CATEGORY] (state) {
    state.categoryId = []
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
