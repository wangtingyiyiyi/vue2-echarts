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
