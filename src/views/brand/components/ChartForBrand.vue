<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import { ECHARTS_COLORS } from '@/utils/const.js'
import { yAxisFormatter, xAxisDateFormatter, xAxisDateSplit, thousands, callInterval, callMax, tooltipMarkerReplace, tooltipMarkerMargin, tooltipMarkerWeight } from '@/utils/chart.js'
import { mapState } from 'vuex'
import chartMixin from '@/utils/mixin/chart.js'

export default {
  name: 'ChartForBrand',
  mixins: [chartMixin],
  props: {
    brandData: {
      type: Array,
      default: () => []
    },
    viewItemVal: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      legenList: [],
      tempKey: '',
      maxValue: 0
    }
  },
  watch: {
    brandData: {
      deep: true,
      handler: function (params) {
        this.initViewItem()
        this.init()
      }
    }
  },
  computed: {
    ...mapState('sys', ['collapsed'])
  },
  methods: {
    initViewItem () {
      const allGmv = []
      const allSales = []
      this.brandData.forEach(item => {
        allGmv.push(...item.gmvList)
        allSales.push(...item.salesList)
      })
      if (this.viewItemVal === 'gmv') {
        this.tempKey = 'gmvList'
        this.maxValue = callMax(allGmv)
      } else if (this.viewItemVal === 'sales') {
        this.tempKey = 'salesList'
        this.maxValue = callMax(allSales)
      }
    },
    getSeries (brandData) {
      const arr = []
      brandData.forEach(item => {
        arr.push({
          name: item.brand || '',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          data: item[this.tempKey]
        })
      })
      return arr
    },
    getLegend (brandData) {
      const legenList = []
      brandData.forEach(item => {
        legenList.push(item.brand)
      })
      return legenList
    },
    getxAxis (brandData) {
      const x = brandData.map(item => item.xlist)
      let l = 0
      let res = []
      x.forEach(item => {
        if (item.length >= l) {
          l = item.length
          res = item
        }
      })
      return res
    },
    init () {
      if (this.chart !== null) {
        this.chart.clear()
      }
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          padding: [5, 10, 13, 10],
          extraCssText: 'width: 170px; box-shadow: 0 10px 24px rgba(29, 42, 68, 0.2);',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          textStyle: {
            color: '#727487'
          },
          formatter: function (params, ticket) {
            const xAxis = xAxisDateFormatter(params[0].name)
            let str = ''
            params.forEach((item, index) => {
              str = str + tooltipMarkerReplace(item.marker) + item.seriesName + ':' + tooltipMarkerWeight(thousands(item.value)) + '<br />'
            })
            return tooltipMarkerMargin(xAxis) + '<br />' + str
          }
        },
        legend: {
          type: 'scroll',
          right: '20px',
          top: '0',
          itemGap: 40,
          itemHeight: 3,
          icon: 'roundRect',
          data: this.getLegend(this.brandData)
        },
        grid: {
          left: '10px',
          right: '20px',
          bottom: '30px',
          top: '37px',
          containLabel: true
        },
        xAxis: {
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
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            fontFamily: 'Arial',
            textStyle: {
              fontSize: '12',
              color: '#878999'
            },
            formatter: function (value) {
              return xAxisDateSplit(xAxisDateFormatter(value))
            }
          },
          data: this.getxAxis(this.brandData)
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          min: 0,
          max: this.maxValue,
          interval: callInterval(0, this.maxValue),
          axisLabel: {
            formatter: function (value) {
              return yAxisFormatter(value)
            }
          }
        },
        color: ECHARTS_COLORS,
        series: this.getSeries(this.brandData)
      })
      this.chart.resize()
    }
  }
}
</script>
