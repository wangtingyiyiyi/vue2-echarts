<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { yAxisFormatter } from '@/utils/chart.js'
import { mockBrandChartData } from '@/mock'

export default {
  name: 'ChartForBrand',
  props: {
    brandData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      chart: null
    }
  },
  methods: {
    getSeries (arr) {
      return arr.map((item) => {
        return {
          name: item.name,
          type: 'line',
          stack: '总量',
          data: item.data
        }
      })
    },
    getLegend (arr) {
      return arr.map(item => {
        return item.name
      })
    },
    init () {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '20px',
          itemGap: 20,
          itemHeight: 3,
          icon: 'roundRect',
          data: this.getLegend(mockBrandChartData.series)
        },
        grid: {
          left: '30px',
          right: '20px',
          bottom: '30px',
          containLabel: true
        },
        xAxis: {
          data: mockBrandChartData.xAxis
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
          axisLabel: {
            formatter: function (value) {
              return yAxisFormatter(value)
            }
          }
        },
        color: ECHARTS_COLORS,
        series: this.getSeries(mockBrandChartData.series)
      })
      this.chart.resize()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
