// chart 用到的方法
// 根据y轴刻度,自动计算单位
export function yAxisFormatter (value) {
  if (value >= 0 && value < 10000) {
    return value
  } else if (value >= 10000 && value < 99999999) {
    return thousands(((value / 10000))) + '万'
  } else {
    return thousands(((value / 100000000))) + '亿'
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
  } else if (group === '3' || group === '6') { // 按季度、半年
    return year + num
  } else if (group === '12') {
    return year
  }
}

// X轴时间截取 202009 -> 09
export function xAxisDateSplit (value) {
  const sDate = value.substring(2, 4)
  const eDate = value.substring(4)
  const arr = ['01', '04', '07', '10']
  const splitArr = ['Q1', 'Q2', 'Q3', 'Q4', 'H1', 'H2']
  if (arr.includes(eDate)) {
    return sDate + '/' + eDate
  } else if (splitArr.includes(eDate)) {
    return sDate + eDate
  } else if (!eDate) {
    return value.substring(0, 4)
  } else {
    return ''
  }
}

// 行业的品牌X轴时间 10 20 50 100
export function xIndustryAxisDateSplit (value, index) {
  const arr = [9, 19, 49, 99]
  if (arr.includes(index)) {
    return index + 1
  }
  return ''
}

// 计算最大值
export function callMax (arr) {
  const max = Math.ceil(Math.max(...arr) / 9.5 * 10)
  let res = 0
  if (max >= 0 && max < 10) { // 个
    res = 10
  } else if (max >= 10 && max < 99) { // 十
    res = Math.ceil(max / 10) * 10
  } else if (max >= 100 && max < 999) { // 百
    res = Math.ceil(max / 100) * 100
  } else if (max >= 1000 && max < 9999) { // 千
    res = Math.ceil(max / 1000) * 1000
  } else if (max >= 10000 && max < 99999) { // 万
    res = roundingFun(max, 10000)
  } else if (max >= 100000 && max < 999999) { // 十万
    res = roundingFun(max, 100000)
  } else if (max >= 1000000 && max < 9999999) { // 百万
    res = roundingFun(max, 1000000)
  } else if (max > 10000000 && max < 99999999) { // 千万
    res = roundingFun(max, 10000000)
  } else if (max > 100000000 && max < 999999999) { // 亿
    res = roundingFun(max, 100000000)
  } else if (max > 1000000000 && max < 9999999999) { // 十亿
    res = roundingFun(max, 1000000000)
  } else if (max > 10000000000) { // 百亿及以上
    res = roundingFun(max, 10000000000)
  }
  return res
}

// 取整策略
export function roundingFun (max, rank) {
  const val = max / rank
  const integer = Math.floor(val)
  const decimal = val - integer
  if (decimal <= 0.5) {
    return (integer + 0.5) * rank
  } else {
    return (integer + 1) * rank
  }
}

// 计算最小值
export function callMin (arr) {
  const min = Math.ceil(Math.min(...arr) / 11 * 10)
  let res = 0
  if (min >= 0 && min < 10000) {
    res = min
  } else if (min >= 10000 && min < 99999999) {
    res = Math.ceil((min / 100000)) * 100000
  } else {
    res = Math.ceil((min / 100000000)) * 100000000
  }
  return res
}

// 计算callInterval
export function callInterval (min, max) {
  const gap = max - 0
  const interval = gap / 5
  return interval
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
