
import { post } from '@/plugins/axios'

// 品牌模糊查询
export function getBrandByLikeCondition (params) {
  return post('brand/list', params)
}

// 品牌分类
export function getCategorytByBrand (params) {
  return post('brandShop/categorys', params)
}

// 品牌概览 table
export function getTableForBrand (params) {
  return post('brandShop/list', params)
}

// 品牌概览 chart
export function getChartForBrand (params) {
  return post('brand/graph', params)
}

// 品牌SPU table
export function getTableForBrandSpu (params) {
  return post('brand/spu/list', params)
}
