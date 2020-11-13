// 常量
// 范围按钮
export const RANGE_LEVEL = [
  {
    icon: 'user',
    label: '近一年',
    value: 'one_year'
  }, {
    icon: 'upload',
    label: '全部',
    value: 'all'
  }
]
// 颗粒度按钮
export const GROUP_LEVEL = [
  {
    icon: 'user',
    label: '按月',
    value: 'month',
    industryExcelHeader: ['月']
  }, {
    icon: 'upload',
    label: '按季度',
    value: 'quarter',
    industryExcelHeader: ['季度']
  }, {
    icon: 'upload',
    label: '按半年',
    value: 'half_year',
    industryExcelHeader: ['半年']

  }, {
    icon: 'upload',
    label: '按年',
    value: 'year',
    industryExcelHeader: ['年']
  }
]
// 图标按钮
export const VIEW_LEVEL = [
  {
    icon: 'upload',
    label: '按销售额',
    value: '1'
  }, {
    icon: 'user',
    label: '按销量',
    value: '0'
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
    industryExcelHeader: ['一级品类']
  }, {
    label: '二级品类',
    value: '1',
    industryWeights: 10,
    industryExcelHeader: ['二级品类']
  }, {
    label: '三级品类',
    value: '2',
    industryWeights: 100,
    industryExcelHeader: ['三级品类']
  }
]

// 行业提数-品类聚合
export const CATEGORT_GROUP = [
  {
    label: '按品牌',
    value: '0',
    industryWeights: 1,
    industryExcelHeader: ['品牌']
  }, {
    label: '按店铺',
    value: '1',
    industryWeights: 10,
    industryExcelHeader: ['店铺ID', '店铺']
  }, {
    label: '按SPU',
    value: '2',
    industryWeights: 100,
    industryExcelHeader: ['SPUID', 'SPU名']
  }
]

// 行业提数-数据指标
export const DATA_INDEX = [
  {
    label: '销量',
    value: '0',
    industryWeights: 1,
    industryExcelHeader: ['销量']
  }, {
    label: 'ASP',
    value: '1',
    industryWeights: 10,
    industryExcelHeader: ['ASP']
  }, {
    label: 'GMV',
    value: '3',
    industryWeights: 100,
    industryExcelHeader: ['GMV']
  }, {
    label: 'SPU数',
    value: '4',
    industryWeights: 1000,
    industryExcelHeader: ['SPU数']
  }
]

export const INDUSTRY_EXCEL_TABLE_PROP = [
  {
    label: '年',
    prop: 'year',
    align: 'left'
  }, {
    label: '半年',
    prop: 'half',
    align: 'left'
  }, {
    label: '季度',
    prop: 'quarter',
    align: 'left'
  }, {
    label: '月',
    prop: 'month',
    align: 'left'
  }, {
    label: '一级品类',
    prop: 'outCat1',
    align: 'left'
  }, {
    label: '二级品类',
    prop: 'outCat2',
    align: 'left'
  }, {
    label: '三级品类',
    prop: 'outCat3',
    align: 'left'
  }, {
    label: '品牌',
    prop: 'brand',
    align: 'left'
  }, {
    label: '店铺ID',
    prop: 'shopid',
    align: 'left'
  }, {
    label: '店铺',
    prop: 'shopName',
    align: 'left'
  }, {
    label: 'SPUID',
    prop: 'spuid',
    align: 'left'
  }, {
    label: 'SPU名',
    prop: 'spuName',
    align: 'left'
  }, {
    label: '销量',
    prop: 'sales',
    align: 'right',
    formatter: 'format'
  }, {
    label: 'GMV',
    prop: 'gmv',
    align: 'right',
    formatter: 'format'
  }, {
    label: 'SPU数',
    prop: 'spuCount',
    align: 'right',
    formatter: 'format'
  }, {
    label: 'ASP',
    prop: 'asp',
    align: 'right',
    formatter: 'format'
  }
]

export const APP_NAME = '欢迎登录久谦中台'

// 默认的行业
export const DEFAULT_INDUSTRY = {
  remark: '1',
  id: '7667',
  label: '彩妆/美护工具'
}

// 默认品牌
export const DEFINE_BRAND = {
  id: '0',
  brandList: [{ brand: '花西子', brandId: '82755', brandSql: '花西子' }]
}
