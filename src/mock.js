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
  // {
  //   name: '销量',
  //   type: 'line',
  //   symbol: 'circle',
  //   symbolSize: 5,
  //   data: [133222, 2234423, 9142342, 1312212, 4212212, 4554464, 6325345]
  // }
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

// 行业自定义品类 treeData
export const mockTreeData = [
  {
    label: '设备1',
    remark: '自',
    id: 1
  }, {
    label: '家装建材 > 楼宇智能 > 楼宇对讲设备',
    remark: '3',
    id: 2
  }, {
    label: '影音数码/智能设备',
    remark: '1',
    id: 3,
    children: [{
      label: '影音数码/智能设备 > 影音设备',
      remark: '2',
      id: 4,
      children: [
        { label: '影音数码/智能设备 > 影音设备 > 舞台设备', remark: '3', id: 5 }
      ]
    }]
  }]
