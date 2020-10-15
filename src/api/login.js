
import { post } from '@/plugins/axios'

// 登陆
export function loginApi (params) {
  return post('userInfo/login', params)
}

// cms导入用户登陆
export function cmsLogin (params) {
  return post('/auth/user', params)
}

// 退出登陆
export function logOut (params) {
  return post('/userInfo/logout', params)
}
