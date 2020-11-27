import { post } from '@/plugins/axios'

// 行业-自定义列表
export function getIndustryDefineList (params) {
  return post('define/list', params)
}

// 行业-自定义保存
export function setIndustryDefineList (params) {
  return post('define/add', params)
}
// 行业-自定义删除
export function removeIndustryDefineList (params) {
  return post('define/remove', params)
}

// 行业-自定义品类树
export function getDefineTree (params) {
  return post('define/tree', params)
}

// 高级筛选品类树
export function getDefineCateList (params) {
  return post('define/cate/list', params)
}
