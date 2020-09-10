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
  // 封装每一个API传给后段的参数
  // config.data.token = sessionStorage.getItem('token')
  // config.data.userId = sessionStorage.getItem('userId')
  // config.data.role = sessionStorage.getItem('role')
  // config.data.createUser = sessionStorage.getItem('createUser')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 相应拦截
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export function post (url, params = {}) {
  params.token = sessionStorage.getItem('token')
  params.userId = sessionStorage.getItem('userId')
  params.role = sessionStorage.getItem('role')
  params.createUser = sessionStorage.getItem('createUser')
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
