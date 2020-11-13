import { post } from '@/plugins/axios'

// 抽屉中自定义行业列表
export function getIndustryDefineList (params) {
  return post('industry/defineList', params)
}

// 配置筛选 option
export function getIndustryCategory (params) {
  return post('industry/category', params)
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
  return post('industryBrand/listTotal', params)
}

// 品牌 图表
export function getBrandChart (params) {
  return post('industryBrand/listGraph', params)
}

// 行业提数 预览待导出excel
export function previewExcel (params) {
  return post('userInfo/preView', params)
}

// 自定义行业
export function setDefineIndustry (params) {
  return post('industry/defineInsert', params)
}

// 自定义行业 删除
export function delDefineIndustry (params) {
  return post('industry/defineDel', params)
}

// select tree
export function getCategoryTreeByCategoyrId (params) {
  return post('industry/listIdCate', params)
}
