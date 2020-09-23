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

// 防抖
export function debounce (fn, interval = 500) {
  let timeout = null
  clearTimeout(timeout)
  timeout = setTimeout(fn, interval)
}
// search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
// window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

// 节流
export function throttle (fn, interval = 300) {
  let canRan = true
  if (!canRan) return
  canRan = false
  setTimeout(() => {
    fn()
    canRan = true
  }, interval)
}
// 鼠标不断点击触发，mousedown(单位时间内只触发一次)
// 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
