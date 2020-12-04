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
// export const ECHARTS_COLORS = ['#5B8FF9', '#5ad8a6', '#909CB4', '#BDD2FD', '#BDEFDB', '#FBE5A2', '#F6C3B7', '#D3C6EA', '#C5E9F7', '#FFD8B8', '#A8D7D6', '#FFD6E7', '#BDD2FD']
export const ECHARTS_COLORS = ['#5B8FF9', '#5ad8a6', '#909CB4', '#F6BD16', '#9270CA', '#269A99', '#E8684A', '#6DC8EC', '#FF9D4D', '#FF99C3', '#BFBFBF', '#C5E9F7', '#FFD8B8', '#A8D7D6', '#FFD6E7', '#BDD2FD']

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
    value: 'tier',
    excelHeader: ['城市级别']
  }, {
    label: '性别',
    value: 'gender',
    excelHeader: ['性别']
  }, {
    label: '年龄范围',
    value: 'age',
    excelHeader: ['年龄范围']
  }, {
    label: '收入',
    value: 'income',
    excelHeader: ['收入']
  }
]

// 人群画像-手机号提数表头
export const PHONE_EXCEL_HEADER = [
  {
    label: '店铺',
    prop: 'shopname',
    align: 'left',
    common: true
  }, {
    label: '店铺ID',
    prop: 'shopid',
    align: 'left',
    common: true
  }, {
    label: 'mid',
    prop: 'mid',
    align: 'left',
    common: true
  }, {
    label: 'aes',
    prop: 'aes',
    align: 'left',
    common: true
  }, {
    label: '累计到店月份',
    prop: 'months',
    align: 'left',
    common: true
  }, {
    label: '第一次到店时间',
    prop: 'firstMonth',
    align: 'left',
    common: true
  }, {
    label: '总计',
    prop: 'cn',
    align: 'left',
    common: true,
    formatter: 'format'
  }
]

// 人群画像-画像提数表头
export const PERSONA_EXCEL_HEADER = [
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
    label: '店铺',
    prop: 'shopname',
    align: 'left'
  }, {
    label: '店铺ID',
    prop: 'shopid',
    align: 'left'
  }, {
    label: 'income',
    prop: 'income',
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
    prop: 'tier',
    align: 'left'
  }, {
    label: '性别',
    prop: 'gender',
    align: 'left'
  }, {
    label: '年龄范围',
    prop: 'ageGroup',
    align: 'left'
  }, {
    label: '年龄',
    prop: 'age',
    align: 'left'
  }, {
    label: '总计',
    prop: 'cn',
    align: 'left',
    common: true,
    formatter: 'format'
  }
]

// 人群画像-MUA表头
export const MUA_EXCEL_HEADER = [
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
    label: '店铺',
    prop: 'shopname',
    align: 'left',
    common: true
  }, {
    label: '店铺ID',
    prop: 'shopid',
    align: 'left',
    common: true
  }, {
    label: 'uv',
    prop: 'uv',
    align: 'left',
    common: true,
    formatter: 'format'
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
    label: '手机号',
    value: 'Phone'
  }, {
    label: '人群画像',
    value: 'Persona'
  }, {
    label: 'MAU',
    value: 'Mau'
  }
]

export const PORTRAIT_RANGE = [
  {
    label: '全部',
    value: '0',
    max: Infinity
  }, {
    label: '近一年',
    value: '12',
    max: 12
  }, {
    label: '近半年',
    value: '6',
    max: 6
  }, {
    label: '近三个月',
    value: '3',
    max: 3
  }
]
