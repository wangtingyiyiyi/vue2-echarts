// 封装 element-ui 常用到的方法
import { Loading } from 'element-ui'

export function refLoading (laodingBody, text = '正在加载数据...') {
  const loadingInstance = Loading.service({
    target: laodingBody,
    text: text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return loadingInstance
}
