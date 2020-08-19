// @/components/Base 路径下, 全局组件注册
import Vue from 'vue'

const requireComponent = require.context('@/components/Base', false, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/\.\//, '').replace(/\.vue/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})
