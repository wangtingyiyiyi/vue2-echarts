
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
  return sum.toString()
}

// 防抖：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
// search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
// window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
export function debounce (fn, interval = 500) {
  let timeout = null
  clearTimeout(timeout)
  timeout = setTimeout(fn, interval)
}

// 节流：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
// 鼠标不断点击触发，mousedown(单位时间内只触发一次)
// 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
export function throttle (fn, interval = 300) {
  let canRan = true
  if (!canRan) return
  canRan = false
  setTimeout(() => {
    fn()
    canRan = true
  }, interval)
}

// 二进制流转换为文件
export function blolToFile (res, filename, fileType = '.xlsx') {
  const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
  const downloadElement = document.createElement('a') // 新建一个DOM节点
  const href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = filename + fileType // 下载后文件名
  document.body.appendChild(downloadElement) // 将新增的节点挂载到页面上
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href)
}

// 导出excel
export function downloadFile (option) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', option.url, true)
  xhr.responseType = 'blob'
  xhr.setRequestHeader('Content-Type', ' application/json')
  xhr.setRequestHeader('token', sessionStorage.getItem('token'))
  xhr.onreadystatechange = function (response) {
    option.onreadystatechange(xhr, response)
  }
  xhr.onprogress = function (params) {
    option.onprogress(params)
  }
  xhr.onload = function (params) {
    if (xhr.status >= 200 && xhr.status < 300) {
      const blob = new Blob([xhr.response], { type: 'application/excel' })
      blolToFile(blob, option.filename, option.fileType)
    }
  }
  xhr.send(JSON.stringify(option.param))
}

// 根据isLeaf递归设置children
export function resetChildrenByIsLeaf (arr) {
  arr.forEach(item => {
    if (item.isLeaf) {
      item.children = null
    } else {
      resetChildrenByIsLeaf(item.children)
    }
  })
}

// 高亮
export function highlight (keyWord, label) {
  const mes = label.replace(new RegExp(`(${keyWord})`, 'gi'), "<span style='color: #F3B71B; font-weight: inherit'>$1</span>")
  return '<span style="font-weight: inherit">' + mes + '</span>'
}
