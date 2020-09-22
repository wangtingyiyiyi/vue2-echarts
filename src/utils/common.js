// 去掉value为空字符串的键值对
export function deleteEmptyKeyVal (obj) {
  const keys = Object.keys(obj)
  keys.forEach(k => {
    if (!obj[k]) {
      delete obj[k]
    }
  })
  return obj
}

// 数组按位求和补位
export function replenishSum (arr, len) {
  let sum = 0
  if (arr.length !== 0) {
    sum = arr.reduce((prev, curr) => {
      return prev + curr
    })
  }
  const l = sum.toString().length
  if (l < len) {
    for (let i = 0; i < len - l; i++) {
      sum = '0' + sum
    }
  }
  return sum
}
