// table数据
export const mockTableData = [
  {
    id: '001',
    category: '海外店铺',
    salesCount: '111',
    salesAmount: 123132,
    salesCountAcc: '912',
    gmvAcc: '912',
    spu: 182,
    price: 12832
  },
  {
    id: '002',
    category: '天猫旗舰店',
    salesCount: '2',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  },
  {
    id: '003',
    category: '淘宝店铺',
    salesCount: '3',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  },
  {
    id: '004',
    category: '店铺A',
    salesCount: '109729319',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  },
  {
    id: '005',
    category: '店铺B',
    salesCount: '109729319',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  },
  {
    id: '006',
    category: '店铺C',
    salesCount: '109729319',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  },
  {
    id: '007',
    category: '店铺D',
    salesCount: '109729319',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  }
]

// setting 品牌option
export const mockBrandsOptions = [
  { brandId: 'yili', brand: '伊利' },
  { brandId: 'mengniu', brand: '蒙牛' },
  { brandId: 'nongfushanquan', brand: '农夫山泉' },
  { brandId: 'yuanqisenlin', brand: '元气森林' },
  { brandId: 'baishikele', brand: '百事可乐' }
]

// setting 行业option
export const mockCidOptions = [
  { cat: '快销品', cid: 'kuaixiaopin' },
  { cat: '果汁', cid: 'guozhi' }
]

// echarts xAxis
export const mockEchartXAxis = {
  type: 'category',
  // x轴线
  axisLine: {
    lineStyle: {
      color: '#D9D9D9',
      width: 2
    }
  },
  // 刻度
  axisTick: {
    show: false
  },
  // x轴文字
  axisLabel: {
    show: true,
    textStyle: {
      fontSize: '14',
      color: '#727484'
    }
  },
  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
}

// echarts Data
export const mockEchartData = [
  {
    name: '销售额',
    type: 'line',
    symbol: 'circle',
    symbolSize: 5,
    data: [12013213, 13312312, 3213122, 4323441, 1231234, 413241, 12341412]
  }
]

// month options
export const mockMonthOption = ['202001', '202002', '202003', '202004']

// table 树形结构数据
export const mockTreeTableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: 2,
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    id: 3,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    hasChildren: true
  }, {
    id: 4,
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]

// 历史自定义标签列表
export const mockTagBySelf = [
  {
    id: '01',
    name: '自定义3C数码配件',
    time: new Date(),
    children: [
      {
        id: '011',
        cat1: '3C数码配件',
        cat2: 'MP3/MP4配件',
        cat3: '耳机贴膜'
      }, {
        id: '012',
        cat1: '3C数码配件',
        cat2: '单反/单电相机配件',
        cat3: '脚架/云台'
      }
    ]
  }, {
    id: '02',
    name: '自定义兑换卡',
    time: new Date(),
    children: [
      {
        id: '021',
        cat1: '兑换卡'
      }
    ]
  }, {
    id: '03',
    name: '自定义金属材料及制品',
    time: new Date(),
    children: []
  }
]

// brand chart data
export const mockBrandChartData = {
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '蒙牛',
      data: [120, 132, 101, 134, 90, 230, 210]
    }, {
      name: '伊利',
      data: [120, 132, 101, 134, 90, 230, 210]
    }, {
      name: '农夫山泉',
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
}

// brand SPU table
export const mockBrandSpuData = [
  {
    spuid: '615132457872',
    spuname: '花西子空气蜜粉/散粉定妆粉饼女持久控油防水防汗遮瑕不脱妆自然',
    spuUrl: 'http://detail.tmall.com/item.htm?id=615132457872',
    avgPrice: 162,
    sumSalescount: 12323,
    sequential: -0.23117934,
    sumGmv: 89400000,
    outCat1: '彩妆/美护工具',
    outCat2: '面部彩妆',
    outCat3: '面部彩妆',
    shopname: '花西子旗舰店',
    gmvBeanList: [226897856, 245539408, 364132992, 251961344, 169551344],
    monthBeanList: ['3_2019_3', '3_2019_4', '3_2020_1', '3_2020_2', '3_2020_3']
  }
]
