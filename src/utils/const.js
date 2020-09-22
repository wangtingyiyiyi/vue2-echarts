// 常量
// 范围按钮
export const RANGE_LEVEL = [
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
export const GROUP_LEVEL = [
  {
    icon: 'user',
    label: '按月',
    value: '0',
    industrySortIndex: [4]
  }, {
    icon: 'upload',
    label: '按季度',
    value: '1',
    industrySortIndex: [3]
  }, {
    icon: 'upload',
    label: '按半年',
    value: '2',
    industrySortIndex: [2]
  }, {
    icon: 'upload',
    label: '按年',
    value: '3',
    industrySortIndex: [1]
  }
]
// 图标按钮
export const VIEW_LEVEL = [
  {
    icon: 'user',
    label: '按销量',
    value: '0'
  }, {
    icon: 'upload',
    label: '按销售额',
    value: '1'
  }
]

// 行业-品牌累计占比
export const ECHARTS_ACTIVED_PARAM = {
  0: ['销量', '销量累计占比'],
  1: ['销售额', '销售额累计占比']
}

// echart 主题颜色
export const ECHARTS_COLORS = ['#5B8FF9', '#5ad8a6', '#909CB4', '#E0E8F9', '#B9ECD8']

// table 排序时传给后端的常量值
export const SORT_TYPES = {
  sumSales: '0', // 销量
  sumGmv: '1', // 销售额
  salesSequential: '2', // 销量环比
  gmvSequential: '3' // 销售额环比
}

// 行业提数-品牌展开
export const CATEGORY_LEVEL = [
  {
    label: '一级品类',
    value: '0',
    industryWeights: 1,
    industrySortIndex: [5]
  }, {
    label: '二级品类',
    value: '1',
    industryWeights: 10,
    industrySortIndex: [6]
  }, {
    label: '三级品类',
    value: '2',
    industryWeights: 100,
    industrySortIndex: [7]
  }
]

// 行业提数-品类聚合
export const CATEGORT_GROUP = [
  {
    label: '按品牌',
    value: '0',
    industryWeights: 1,
    industrySortIndex: [8]
  }, {
    label: '按店铺',
    value: '1',
    industryWeights: 10,
    industrySortIndex: [9, 10]
  }, {
    label: '按SPU',
    value: '2',
    industryWeights: 100,
    industrySortIndex: [11, 12]
  }
]

// 行业提数-数据指标
export const DATA_INDEX = [
  {
    label: '销量',
    value: '0',
    industryWeights: 1,
    industrySortIndex: [13]
  }, {
    label: 'ASP',
    value: '1',
    industryWeights: 10,
    industrySortIndex: [15]
  }, {
    label: 'GMV',
    value: '3',
    industryWeights: 100,
    industrySortIndex: [14]
  }, {
    label: 'SPU数',
    value: '4',
    industryWeights: 1000,
    industrySortIndex: [16]
  }
]

// 行业提数-Excel在线预览表头
export const EXCEL_RULES = {
  1: '年',
  2: '半年',
  3: '季度',
  4: '月',
  5: '一级品类',
  6: '二级品类',
  7: '三级品类',
  8: '品牌',
  9: '店铺ID',
  10: '店铺',
  11: 'SPUID',
  12: 'SPU名',
  13: '销量',
  14: 'GMV',
  15: 'ASP',
  16: 'SPU数'

}
