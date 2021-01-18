import { post } from '@/plugins/axios'

// 配置筛选 option
export function getIndustryCategory (params) {
  return post('cate/list', params)
}

// 行业 month options
export function getMonthOption (params) {
  return post('/cate/months', params)
}

// 行业 趋势图
export function getIndustryEchart (params) {
  return post('/cate/graph', params)
}

// 行业 子品类table
export function getVerifyDownload (params) {
  return post('userInfo/download', params)
}

// 按照子品类展开
export function getIndustryFlatList (params) {
  return post('/cate/branch', params)
}

// 抽屉 久谦品类树
export function getCategoryTree (params) {
  return post('cate/list', params)
}

// 品牌 table
export function getIndustryBrandTable (params) {
  return post('cate/brand/list', params)
}

// 品牌 图表
export function getBrandChart (params) {
  return post('cate/brand/graph', params)
}

// 高级筛选
export function getDefineCateList (params) {
  return post('define/cate/list', params)
}
// 行业SPU table
export function getTableForIndustrySpu (params) {
  return post('cate/spu/list', params)
}
