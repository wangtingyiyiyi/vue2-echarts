const CommonLayoutView = () => import(/* webpackChunkName: "CommonLayoutView" */ '../views/layouts/CommonLayout.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/login/Login.vue')
const User = () => import(/* webpackChunkName: "User" */ '../views/user/User.vue')
const Setting = () => import(/* webpackChunkName: "Setting" */ '../views/setting/Setting.vue')
const Industry = () => import(/* webpackChunkName: "Industry" */ '../views/industry/Industry.vue')
const Brand = () => import(/* webpackChunkName: "Brand" */ '../views/brand/Brand.vue')

// import Login from '@/views/login/Login.vue'
// import CommonLayoutView from '@/views/layouts/CommonLayout.vue'
// import Brand from '@/views/brand/Brand.vue'
// import Industry from '@/views/industry/Industry.vue'
// import User from '@/views/user/User.vue'
// import Setting from '@/views/setting/Setting.vue'

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    name: '首页',
    meta: {
      icon: 'warning'
    },
    component: CommonLayoutView,
    children: [
      {
        path: 'industry',
        name: '行业',
        meta: {
          icon: 'table',
          svgIcon: 'icon-menu',
          activeMenu: 'industry',
          label: ''
        },
        component: Industry
      },
      {
        path: 'brand',
        name: '品牌',
        meta: {
          icon: 'dashboard',
          svgIcon: 'icon-tag',
          activeMenu: 'brand'
        },
        component: Brand
      }
    ]
  }, {
    path: '/user',
    name: '仪表盘',
    component: CommonLayoutView,
    children: [
      {
        path: 'personal',
        name: '个人中心',
        meta: {
          icon: 'el-icon-user'
        },
        component: User
      },
      {
        path: 'setting',
        name: '设置',
        meta: {
          icon: 'el-icon-setting'
        },
        component: Setting
      }
    ]
  }
]
