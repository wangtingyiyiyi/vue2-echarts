const CommonLayoutView = () => import('../views/layouts/CommonLayout.vue')
const Login = () => import('../views/login/Login.vue')
const User = () => import('../views/user/User.vue')
const Setting = () => import('../views/setting/Setting.vue')
const Industry = () => import('../views/industry/Industry.vue')
const Brand = () => import('../views/brand/Brand.vue')
const File = () => import('../views/file/File.vue')
const Page404 = () => import('../views/error/404.vue')
// const Dashboard = () => import('../views/dashboard/Dashboard.vue')
// const DpCategory = () => import('@/views/dp-category/Category.vue')

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/error',
    name: 'page404',
    component: Page404
  }, {
    path: '/tmall',
    name: '天猫',
    meta: {
      svgIcon: 'menu',
      isMenu: true
    },
    component: CommonLayoutView,
    children: [
      {
        path: 'tmall-industry',
        name: '行业',
        meta: {
          svgIcon: 'menu',
          scrollTop: 145
        },
        component: Industry
      }, {
        path: 'tmall-brand',
        name: '品牌',
        meta: {
          svgIcon: 'brand',
          scrollTop: Infinity
        },
        component: Brand
      }, {
        path: 'tmall-file',
        name: '提数',
        meta: {
          permission: ['1'],
          svgIcon: 'excel',
          scrollTop: Infinity
        },
        component: File
      }
    ]
  },
  // , {
  //   path: '/dp',
  //   name: '点评',
  //   meta: {
  //     icon: 'filter',
  //     svgIcon: 'excel',
  //     isMenu: true
  //   },
  //   component: CommonLayoutView,
  //   children: [
  //     {
  //       path: 'dp-category',
  //       name: '点评行业',
  //       meta: {
  //         svgIcon: 'filter'
  //       },
  //       component: DpCategory
  //     }
  //   ]
  // },
  {
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
  }
]
