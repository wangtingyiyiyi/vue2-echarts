
import { get, post } from '@/plugins/axios'

export function getBrandTestAPI (params) {
  return get('/project/falls', params)
}

export function postBrandTestAPI (params) {
  return post('/project/falls', params)
}
