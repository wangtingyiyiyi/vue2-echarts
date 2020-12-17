import { post } from '@/plugins/axios'

// 小红书统计预览
export function getXhsPreview (params) {
  return post('xhs/preview', params)
}
