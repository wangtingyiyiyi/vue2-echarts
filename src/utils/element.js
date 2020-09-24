// 封装 element-ui 常用到的方法
import { Loading } from 'element-ui'
import '@/theme/common.styl'
export function refLoading (laodingBody, text = '正在加载数据...') {
  const loadingInstance = Loading.service({
    target: laodingBody,
    text: text,
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.85)',
    customClass: 'loading-class'
  })
  return loadingInstance
}
