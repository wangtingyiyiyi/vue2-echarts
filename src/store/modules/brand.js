import {
  SET_BRAND_BRANDS,
  SET_BRAND_CATEGORY,
  RESET_BRAND_BRANDS,
  RESET_BRAND_CATEGORY,
  SET_ACTIVE_BRAND
} from '../mutation'
import { BRAND_DEFINE_BRAND } from '@/utils/const.js'

const state = {
  brandList: BRAND_DEFINE_BRAND.brandList,
  cate: {},
  activeBrand: ''
}

const mutations = {
  [SET_BRAND_BRANDS] (state, payload) {
    state.brandList = [...payload]
  },
  [SET_BRAND_CATEGORY] (state, payload) {
    state.cate = payload
  },
  [RESET_BRAND_BRANDS] (state) {
    state.brandList = []
  },
  [RESET_BRAND_CATEGORY] (state) {
    state.cate = {}
  },
  [SET_ACTIVE_BRAND] (state, payload) {
    state.activeBrand = payload
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
