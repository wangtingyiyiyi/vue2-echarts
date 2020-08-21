import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './config'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局守卫用来判断权限路由, 没有权限，导航至404页面
// 用户通过url进入项目, 判断是否存在token等信息，如果没有，导航至login
router.beforeEach((to, form, next) => {
  const token = sessionStorage.getItem('token')
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
