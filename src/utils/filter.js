// 注册vue全局过滤器
import Moment from 'moment'

// 千分位
const format = function (value) {
  if (!value || value === '' || value === '-') return value
  if (`${value}`.includes('.')) {
    return value.toLocaleString()
  } else {
    return String(value).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
}
// 时间格式化
const moment = function (value, pattern = 'YYMMDD') {
  if (value) {
    return Moment(value).format(pattern)
  } else {
    return value
  }
}
// 百分数
const percentage = function (value) {
  if (isNaN(value) || value === 'Infinity') { return 'NaN' }
  return (value * 100).toFixed(2) + '%'
}
// 万进制
const million = function (value) {
  if (isNaN(value) || value === 'Infinity') { return 'NaN' }
  return (value / 10000).toFixed(1)
}

export default {
  format,
  moment,
  percentage,
  million
}
