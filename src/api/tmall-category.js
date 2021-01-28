import { post } from '@/plugins/axios'

// 行业 month options
export function getMonthOption (params) {
  return post('/cate/months', params)
}
