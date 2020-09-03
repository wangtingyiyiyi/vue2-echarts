// 全局组件注册
import Vue from 'vue'

// @/components/Base 路径下,
const requireBase = require.context('@/components/Base', false, /\.vue$/)
requireBase.keys().forEach(fileName => {
  const componentConfig = requireBase(fileName)
  const componentName = fileName.replace(/\.\//, '').replace(/\.vue/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// @/components/Charts 路径下,
const requireCharts = require.context('@/components/Charts', false, /\.vue$/)
requireCharts.keys().forEach(fileName => {
  const componentConfig = requireCharts(fileName)
  const componentName = fileName.replace(/\.\//, '').replace(/\.vue/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})
