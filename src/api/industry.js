import { post } from '@/plugins/axios'

// 抽屉中自定义行业列表
export function getIndustryDefineList (params) {
  return post('industry/defineList', params)
}
