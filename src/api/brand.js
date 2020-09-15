
import { post } from '@/plugins/axios'

// 品牌 month options
export function getMonthOption (params) {
  return post('industry/months', params)
}

// 品牌模糊查询
export function getBrandByLikeCondition (params) {
  return post('brandShop/brands', params)
}

// 品牌分类
export function getCategorytByBrand (params) {
  return post('brandShop/categorys', params)
}

// 品牌店铺 table
export function getTableForBrandShop (params) {
  return post('brandShop/listTotal', params)
}
