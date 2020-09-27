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

export const mockTree = [{ outCat1: '家居日用工具', outCat2: '', outCat3: '', label: '家居日用工具', id: '7663', count: 1, remark: 1, childList: [{ outCat1: '家居日用工具', outCat2: '卫浴用具', outCat3: '', label: '家居日用工具 > 卫浴用具', id: '7815', count: 1, remark: 2, childList: [{ outCat1: '家居日用工具', outCat2: '卫浴用具', outCat3: '牙刷架', label: '家居日用工具 > 卫浴用具 > 牙刷架', id: '4784', count: 0, remark: 3, childList: null, hasChild: false }], hasChild: true }], hasChild: true, isLeaf: false }, { outCat1: '个人护理仪器', outCat2: '', outCat3: '', label: '个人护理仪器', id: '7649', count: 1, remark: 1, childList: [{ outCat1: '个人护理仪器', outCat2: '口腔护理', outCat3: '', label: '个人护理仪器 > 口腔护理', id: '7687', count: 4, remark: 2, childList: [{ outCat1: '个人护理仪器', outCat2: '口腔护理', outCat3: '电动牙刷头', label: '个人护理仪器 > 口腔护理 > 电动牙刷头', id: '4361', count: 0, remark: 3, childList: null, hasChild: false }, { outCat1: '个人护理仪器', outCat2: '口腔护理', outCat3: '牙刷消毒器', label: '个人护理仪器 > 口腔护理 > 牙刷消毒器', id: '4406', count: 0, remark: 3, childList: null, hasChild: false }, { outCat1: '个人护理仪器', outCat2: '口腔护理', outCat3: '婴童电动牙刷', label: '个人护理仪器 > 口腔护理 > 婴童电动牙刷', id: '5715', count: 0, remark: 3, childList: null, hasChild: false }, { outCat1: '个人护理仪器', outCat2: '口腔护理', outCat3: '电动牙刷', label: '个人护理仪器 > 口腔护理 > 电动牙刷', id: '4359', count: 0, remark: 3, childList: null, hasChild: false }], hasChild: true }], hasChild: true, isLeaf: false }, { outCat1: '个人护理用具', outCat2: '', outCat3: '', label: '个人护理用具', id: '7650', count: 1, remark: 1, childList: [{ outCat1: '个人护理用具', outCat2: '口腔护理', outCat3: '', label: '个人护理用具 > 口腔护理', id: '7693', count: 3, remark: 2, childList: [{ outCat1: '个人护理用具', outCat2: '口腔护理', outCat3: '牙刷', label: '个人护理用具 > 口腔护理 > 牙刷', id: '4615', count: 0, remark: 3, childList: null, hasChild: false }, { outCat1: '个人护理用具', outCat2: '口腔护理', outCat3: '月子牙刷', label: '个人护理用具 > 口腔护理 > 月子牙刷', id: '6903', count: 0, remark: 3, childList: null, hasChild: false }, { outCat1: '个人护理用具', outCat2: '口腔护理', outCat3: '婴幼儿牙刷', label: '个人护理用具 > 口腔护理 > 婴幼儿牙刷', id: '5719', count: 0, remark: 3, childList: null, hasChild: false }], hasChild: true }], hasChild: true, isLeaf: false }]
