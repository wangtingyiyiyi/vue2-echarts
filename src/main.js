import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/components.js' // 注册全局组件

import ElementUI from './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.styl'

import './icons' // svg icon

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
