
import { post } from '@/plugins/axios'

// 登录
export function loginApi (params) {
  return post('user/login', params)
}

// cms导入用户登录
export function cmsLogin (params) {
  return post('/auth/user', params)
}

// 退出登录
export function logOut (params) {
  return post('/user/logout', params)
}
