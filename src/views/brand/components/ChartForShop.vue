<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { yAxisFormatter } from '@/utils/chart.js'
import { mockBrandChartData } from '@/mock'

export default {
  name: 'ChartForShop',
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
    init () {
      console.info(mockBrandChartData)
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '20px',
          itemGap: 20,
          itemHeight: 3,
          icon: 'roundRect'
        },
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        grid: {
          left: '30px',
          right: '20px',
          bottom: '30px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
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
            interval: 0,
            rotate: 0,
            textStyle: {
              fontSize: '14',
              color: '#727484'
            }
          }
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
        series: [
          { type: 'bar', barWidth: '10px' },
          { type: 'bar', barWidth: '10px' },
          { type: 'bar', barWidth: '10px' }
        ]
      })
      this.chart.resize()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
