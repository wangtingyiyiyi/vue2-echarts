import { post } from '@/plugins/axios'

// 品牌查询
export function getShopList (params) {
  return post('shop/list', params)
}

// 预览
export function getShopPreview (params) {
  return post('shop/preview', params)
}

// 店铺提取详情
export function getShopPerson (params) {
  return post('shop/person', params)
}
