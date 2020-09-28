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
  return post('industry/months', params)
}

// 行业 趋势图
export function getIndustryEchart (params) {
  return post('industry/listGraph', params)
}

// 行业 子品类table
export function getIndustryFlatList (params) {
  return post('industry/flatList', params)
}

// 抽屉 久谦品类树
export function getCategoryTree (params) {
  return post('industry/listCategory', params)
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
