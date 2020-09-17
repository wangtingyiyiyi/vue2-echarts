// chart 用到的方法
// 根据y轴刻度,自动计算单位
export function yAxisFormatter (value) {
  if (value >= 0 && value < 10000) {
    return value
  } else if (value >= 10000 && value < 99999999) {
    return thousands(parseInt((value / 10000))) + '万'
  } else {
    return thousands(parseInt((value / 100000000))) + '亿'
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
  const max = Math.ceil(Math.max(...arr) / 8) * 10
  if (max >= 0 && max < 10000) {
    return max
  } else if (max >= 10000 && max < 99999999) {
    return parseInt((max / 100000)) * 100000
  } else {
    return parseInt((max / 1000000000)) * 1000000000
  }
}

// 计算百分比
export function computePercent (arr) {
  const res = arr.map(item => {
    return (item * 100).toFixed(2)
  })
  return res
}

// x轴品牌label formater
export function brandFormatter (value) {
  let lastIndex = value.lastIndexOf('_')
  if (lastIndex < 0) {
    lastIndex = value.length
  }
  return value.substring(0, lastIndex)
}
