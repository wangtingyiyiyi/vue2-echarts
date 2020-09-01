// table数据
export const mockTableData = [
  {
    id: '001',
    category: '海外店铺',
    salesCount: '109729319',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  },
  {
    id: '002',
    category: '天猫旗舰店',
    salesCount: '109729319',
    salesAmount: 123132,
    salesCountAcc: 0.021872,
    gmvAcc: 0.21737,
    spu: 182,
    price: 12832
  },
  {
    id: '003',
    category: '淘宝店铺',
    salesCount: '109729319',
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
  boundaryGap: false,
  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
}

// echarts Data
export const mockEchartData = [
  {
    name: '销售额',
    type: 'line',
    stack: '总量',
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: '销量',
    type: 'line',
    stack: '总量',
    data: [220, 182, 191, 234, 290, 330, 310]
  }
]
