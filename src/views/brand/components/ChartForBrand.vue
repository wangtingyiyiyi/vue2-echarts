<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { yAxisFormatter, xAxisDateFormatter, xAxisDateSplit, thousands, callInterval, callMax } from '@/utils/chart.js'
import { mapState } from 'vuex'

export default {
  name: 'ChartForBrand',
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
      chart: null,
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
    },
    collapsed: {
      handler: function (params) {
        if (this.chart) {
          this.chart.resize()
        }
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
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket) {
            const xAxis = xAxisDateFormatter(params[0].name)
            let str = ''
            params.forEach((item, index) => {
              str = str + item.marker + item.seriesName + ':' + thousands(item.value) + '<br />'
            })
            return xAxis + '<br />' + str
          }
        },
        legend: {
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
