import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/components.js' // 注册全局组件
import _ from 'lodash'

import ElementUI from './plugins/element.js'

import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.styl'

import './icons' // svg icon
import Moment from 'moment'

// import { permission } from '@/utils/common.js' // 全局注册permission方法

// 全局注册filter
import filters from '@/utils/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype._ = _
Vue.use(ElementUI)
Vue.prototype.$moment = Moment
Vue.config.productionTip = false
// Vue.prototype.$permission = permission()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
