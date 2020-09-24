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
    industryExcelHeader: ['月']
  }, {
    icon: 'upload',
    label: '按季度',
    value: '1',
    industryExcelHeader: ['季度']
  }, {
    icon: 'upload',
    label: '按半年',
    value: '2',
    industryExcelHeader: ['半年']

  }, {
    icon: 'upload',
    label: '按年',
    value: '3',
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

export const MOCK_DATA = [
  {
    year: '2012',
    halfyear: '2012H1',
    q: 'Q1',
    month: '201201',
    outCat1: '彩妆',
    outCat2: '面部护肤',
    outCat3: '面霜',
    brand: '完美日记',
    spuId: 12132312,
    spuName: '完美日记巴拉巴拉产品',
    shop: '完美日记旗舰店',
    shopId: 2712,
    sales: 12233123846,
    GMV: 8712361221,
    gmv: 1221875321,
    spuCount: 12371,
    asp: 242.3
  }
]
