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

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
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
