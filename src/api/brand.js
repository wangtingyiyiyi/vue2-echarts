
import { post } from '@/plugins/axios'

// 品牌 month options
export function getMonthOption (params) {
  return post('industry/months', params)
}
