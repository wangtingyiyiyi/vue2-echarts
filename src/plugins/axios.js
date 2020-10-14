import { Message } from 'element-ui'

const Axios = require('axios').default

const config = {
  baseURL: process.env.VUE_APP_API_URL,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
}

const axios = Axios.create(config)

export function objToStr (obj) {
  const arr = []
  for (const key in obj) {
    arr.push(key + '=' + obj[key])
  }
  return arr.join('&')
}

// 请求拦截
axios.interceptors.request.use(function (config) {
  if (sessionStorage.getItem('token')) {
    config.headers.token = sessionStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      sessionStorage.clear()
      Message.error('token已过期，请重新登录')
      setTimeout(() => {
        window.location.href = '/login'
      }, 3000)
    }
    // 返回接口返回的错误信息
    return Promise.reject(error)
  }
)

export function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    const str = objToStr(params)
    axios.get(encodeURI(`${url}?${str}`))
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

// 导出二进制文件
export function blobPost (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: 'blob'
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
