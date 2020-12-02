// 常量
export const APP_NAME = '久谦中台'

// 范围按钮
export const RANGE_LEVEL = [
  {
    label: '近一年',
    value: 'one_year'
  }, {
    label: '全部',
    value: 'all'
  }
]
// 颗粒度按钮
export const GROUP_LEVEL = [
  {
    label: '按月',
    value: 'month',
    excelHeader: ['月']
  }, {
    label: '按季度',
    value: 'quarter',
    excelHeader: ['季度']
  }, {
    label: '按半年',
    value: 'half_year',
    excelHeader: ['半年']
  }, {
    label: '按年',
    value: 'year',
    excelHeader: ['年']
  }
]
// 图标按钮
export const VIEW_LEVEL = [
  {
    label: '按销售额',
    value: 'gmv'
  }, {
    label: '按销量',
    value: 'sales'
  }
]

// 行业-品牌累计占比
export const ECHARTS_ACTIVED_PARAM = {
  sales: ['销量', '销量累计占比'],
  gmv: ['销售额', '销售额累计占比']
}

// echart 主题颜色
export const ECHARTS_COLORS = ['#5B8FF9', '#5ad8a6', '#909CB4', '#E0E8F9', '#B9ECD8']

// 行业提数-品牌展开
export const CATEGORY_LEVEL = [
  {
    label: '一级品类',
    value: '0',
    industryWeights: 1,
    excelHeader: ['一级品类']
  }, {
    label: '二级品类',
    value: '1',
    industryWeights: 10,
    excelHeader: ['二级品类']
  }, {
    label: '三级品类',
    value: '2',
    industryWeights: 100,
    excelHeader: ['三级品类']
  }
]

// 行业提数-品类聚合
export const CATEGORT_GROUP = [
  {
    label: '按品牌',
    value: '0',
    industryWeights: 1,
    excelHeader: ['品牌']
  }, {
    label: '按店铺',
    value: '1',
    industryWeights: 10,
    excelHeader: ['店铺ID', '店铺']
  }, {
    label: '按品名',
    value: '2',
    industryWeights: 100,
    excelHeader: ['品名']
  }, {
    label: '按SPU',
    value: '3',
    industryWeights: 1000,
    excelHeader: ['SPUID', 'SPU名']
  }
]

// 行业提数-数据指标
export const DATA_INDEX = [
  {
    label: '销量',
    value: '0',
    industryWeights: 1,
    disabled: true,
    excelHeader: ['销量']
  }, {
    label: 'ASP',
    value: '1',
    disabled: true,
    industryWeights: 10,
    excelHeader: ['ASP']
  }, {
    label: 'GMV',
    value: '3',
    disabled: true,
    industryWeights: 100,
    excelHeader: ['GMV']
  }, {
    label: 'SPU数',
    value: '4',
    disabled: false,
    industryWeights: 1000,
    excelHeader: ['SPU数']
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
    label: '品名',
    prop: 'series',
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

// 行业-默认参数
export const INDUSTRY_DEFAULT_INDUSTRY = {
  rank: '1',
  category: '彩妆/美护工具',
  label: '彩妆/美护工具',
  category1: '彩妆/美护工具',
  category2: '',
  category3: ''
}

// 品牌-默认参数
export const BRAND_DEFINE_BRANDLIST =
  ['花西子']
  // ["欧莱雅/L'OREAL", '玉兰油/Olay', '娇韵诗/Clarins', '娇兰/Guerlain', '雅诗兰黛/Estee Lauder',
  //   '艾思诺娜/Excellula', '丝维诗兰', '伊诗贝格/EISENBERG', '完美日记/PERFECT DIARY', "欧舒丹/L'occitane",
  //   '乔治阿玛尼/GIORGIO ARMANI', '纪梵希/Givenchy', '玉泽/Dr.Yu']

// 提数-手机号提数-画像纬度
export const PORTRAIT_LEVEL = [
  {
    label: '省份',
    value: 'province',
    excelHeader: ['省份']
  }, {
    label: '城市',
    value: 'city',
    excelHeader: ['城市']
  }, {
    label: '城市级别',
    value: 'city_level',
    excelHeader: ['城市级别']
  }, {
    label: '性别',
    value: 'sex',
    excelHeader: ['性别']
  }, {
    label: '年龄范围',
    value: 'age',
    excelHeader: ['年龄范围']
  }
]

// 人群画像-画像提数表头
export const PORTRAIT_ECXCEL_HEADER = [
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
    label: '省份',
    prop: 'province',
    align: 'left'
  }, {
    label: '城市',
    prop: 'city',
    align: 'left'
  }, {
    label: '城市级别',
    prop: 'city_level',
    align: 'left'
  }, {
    label: '性别',
    prop: 'sex',
    align: 'left'
  }, {
    label: '年龄范围',
    prop: 'age',
    align: 'left'
  }
]

// UV聚合
export const UV_GROUP = [
  {
    label: '按店铺',
    value: 'shop'
  }, {
    label: '全部',
    value: 'all'
  }
]

export const OPERATOR_BUTTONS = [
  {
    label: '手机号提数',
    value: 'PartPhone'
  }, {
    label: '画像提数',
    value: 'PartIcon'
  }, {
    label: 'MAU',
    value: 'PartMau'
  }
]

export const MOCK_DATA = [
  {
    shopName: '蒙牛旗舰店蒙牛旗舰店蒙牛旗舰店',
    count: 1299973,
    current: '全部',
    min: 1,
    out: 1299973
  }, {
    shopName: '伊利旗舰店',
    count: 1299973,
    current: '全部',
    min: 1,
    out: 1299973
  }, {
    shopName: '三元旗舰店',
    count: 3239973,
    current: '全部',
    min: 1,
    out: 2375125
  }
]

export const PORTRAIT_RANGE = [
  {
    label: '全部',
    value: 'all'
  }, {
    label: '近一年',
    value: 'one_year'
  }, {
    label: '近半年',
    value: 'half_year'
  }, {
    label: '近三个月',
    value: 'three_month'
  }
]
