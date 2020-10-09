import {
  SET_BRAND_BRANDS,
  SET_BRAND_CATEGORY,
  RESET_BRAND_BRANDS,
  RESET_BRAND_CATEGORY,
  SET_BRAND_SETTING,
  SET_BRAND_CATEGORY_OPTION,
  RESET_BRAND_CATEGORY_OPTION,
  RESET_BRAND_SETTING
} from '../mutation'

const state = {
  brandList: [],
  categoryId: '0',
  settingParam: {},
  categoryOptions: [{ childList: null, hasChild: false, id: '0', label: '全部', outCat1: '全部', remark: 1 }]
}

const mutations = {
  [SET_BRAND_BRANDS] (state, payload) {
    state.brandList = [...payload]
  },
  [SET_BRAND_CATEGORY] (state, payload) {
    state.categoryId = payload
  },
  [SET_BRAND_CATEGORY_OPTION] (state, payload) {
    state.categoryOptions = payload
  },
  [SET_BRAND_SETTING] (state, payload) {
    state.settingParam = payload
  },
  [RESET_BRAND_BRANDS] (state) {
    state.brandList = []
  },
  [RESET_BRAND_CATEGORY] (state) {
    state.categoryId = '0'
  },
  [RESET_BRAND_CATEGORY_OPTION] () {
    state.categoryOptions = [{ childList: null, hasChild: false, id: '0', label: '全部', outCat1: '全部', remark: 1 }]
  },
  [RESET_BRAND_SETTING] (state, payload) {
    state.settingParam = {}
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
