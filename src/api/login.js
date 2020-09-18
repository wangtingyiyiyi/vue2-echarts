
import { post } from '@/plugins/axios'

// 登陆
export function loginApi (params) {
  return post('userInfo/login', params)
}
