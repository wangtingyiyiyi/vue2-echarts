// chart 用到的方法
// 根据y轴刻度,自动计算单位
export function yAxisFormatter (value) {
  if (value >= 0 && value < 10000) {
    return value
  } else if (value >= 10000 && value < 9999999) {
    return thousands(parseInt((value / 10000))) + '万'
  } else {
    return thousands(parseInt((value / 10000000))) + '千万'
  }
}

// 千分位
export function thousands (value) {
  if (`${value}`.includes('.')) {
    return value.toLocaleString()
  } else {
    return String(value).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
}

// X轴时间刻度换算
export function xAxisDateFormatter (value) {
  const group = value.split('_')[0]
  const year = value.split('_')[1]
  const num = value.split('_')[2]
  if (group === '1') { // 按月
    if (Number(num) <= 9) {
      return year + '0' + num
    } else {
      return year + num
    }
  } else if (group === '3') { // 按季度
    return year + 'Q' + num
  } else if (group === '6') {
    if (num === '1') {
      return year + 'H1'
    } else {
      return year + 'H2'
    }
  } else if (group === '12') {
    return year
  }
}

// 计算最大值
export function callMax (arr) {
  return Math.ceil(Math.max(...arr) / 9.5) * 10
}
