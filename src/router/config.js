const CommonLayoutView = () => import('../views/layouts/CommonLayout.vue')
const Login = () => import('../views/login/Login.vue')
const User = () => import('../views/user/User.vue')
const Setting = () => import('../views/setting/Setting.vue')
const Industry = () => import('../views/industry/Industry.vue')
const Brand = () => import('../views/brand/Brand.vue')
const File = () => import('../views/file/File.vue')
const Page404 = () => import('../views/error/404.vue')
// const Home = () => import('../views/home/Home.vue')

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
      // {
      //   path: 'home',
      //   name: '首页',
      //   component: Home
      // },
      {
        path: 'industry',
        name: '行业',
        meta: {
          svgIcon: 'menu'
        },
        component: Industry
      }, {
        path: 'brand',
        name: '品牌',
        meta: {
          svgIcon: 'brand'
        },
        component: Brand
      }, {
        path: 'file',
        name: '提数',
        meta: {
          permission: ['1'],
          svgIcon: 'excel'
        },
        component: File
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
      }, {
        path: 'setting',
        name: '设置',
        meta: {
          icon: 'el-icon-setting'
        },
        component: Setting
      }
    ]
  }, {
    path: '/error',
    name: 'page404',
    component: Page404
  }
]
