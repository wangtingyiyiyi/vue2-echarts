// 按钮权限控制
import store from '@/store'

function permission (el, binding) {
  const storeType = store.getters && store.getters.type
  const sessType = sessionStorage.getItem('type')
  if (storeType === '0' || sessType === '0') {
    el.style.display = 'none'
  }
}

export default {
  inserted (el, binding) {
    permission(el, binding)
  },
  update (el, binding) {
    permission(el, binding)
  }
}
