// 常量
// 范围按钮
export const RANGE_BUTTONS = [
  {
    icon: 'user',
    label: '近一年',
    value: '1'
  }, {
    icon: 'upload',
    label: '全部',
    value: '0'
  }
]
// 颗粒度按钮
export const GROUP_BUTTONS = [
  {
    icon: 'user',
    label: '按月',
    value: '0'
  }, {
    icon: 'upload',
    label: '按季度',
    value: '1'
  }, {
    icon: 'upload',
    label: '按半年',
    value: '2'
  }, {
    icon: 'upload',
    label: '按年',
    value: '3'
  }
]
// 图标按钮
export const ECHARTS_BUTTONS = [
  {
    icon: 'user',
    label: '按销量',
    value: 'sumSalescount'
  }, {
    icon: 'upload',
    label: '按销售额',
    value: 'sumGmv'
  }
]

// echart 主题颜色
export const ECHARTS_COLORS = ['#5B8FF9', '#5ad8a6', '#909CB4', '#E0E8F9', '#B9ECD8']

// table 排序时传给后端的常量值
export const SORT_TYPES = {
  sumSales: '0', // 销量
  sumGmv: '1', // 销售额
  salesSequential: '2', // 销量环比
  gmvSequential: '3' // 销售额环比
}
