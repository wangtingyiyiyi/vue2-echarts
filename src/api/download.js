import { post } from '@/plugins/axios'

// 行业提数 预览待导出excel
export function previewExcel (params) {
  return post('download/preview', params)
}
