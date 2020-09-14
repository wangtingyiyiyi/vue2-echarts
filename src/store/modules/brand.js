import { SET_BRAND_BRANDS, SET_BRAND_CATEGORY } from '../mutation'

const state = {
  brands: [],
  cates: []
}

const mutations = {
  [SET_BRAND_BRANDS] (state, payload) {
    state.brands = [...payload]
  },
  [SET_BRAND_CATEGORY] (state, payload) {
    state.cates = [...payload]
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
