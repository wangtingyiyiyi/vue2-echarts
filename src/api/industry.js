import { post } from '@/plugins/axios'

// 抽屉中自定义行业列表
export function getIndustryDefineList (params) {
  return post('industry/defineList', params)
}

// 配置筛选 option
export function getIndustryCategory (params) {
  return post('industry/category', params)
}

// 品牌排行 table
export function getIndustryTable (params) {
  return post('industry/listTotal', params)
}

// 行业 month options
export function getMonthOption (params) {
  return post('industry/months', params)
}

// 行业 趋势图
export function getIndustryEchart (params) {
  return post('industry/listGraph', params)
}

// 行业 子品类table
export function getFlatList (params) {
  return post('industry/flatList', params)
}
