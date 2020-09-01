
const state = {
  brands: [],
  cates: []
}

const mutations = {
  RESET_SETTING_BRANDS: (state, data) => {
    state.brands = data
  },
  RESET_SETTING_CATE: (state, data) => {
    state.cates = data
  }
}

const actions = {
  changeSettingBrand ({ commit }, data) {
    commit('RESET_SETTING_BRANDS', data)
  },
  changeSettingCate ({ commit }, data) {
    commit('RESET_SETTING_CATE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
