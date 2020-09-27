import {
  SET_BRAND_BRANDS,
  SET_BRAND_CATEGORY,
  RESET_BRAND_BRANDS,
  RESET_BRAND_CATEGORY,
  SET_BRAND_SETTING
} from '../mutation'

const state = {
  brandList: [],
  categoryId: '0',
  settingParam: {}
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
    state.categoryId = '0'
  },
  [SET_BRAND_SETTING] (state, payload) {
    state.settingParam = payload
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
