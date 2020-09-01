<template>
  <div ref="chart" style="width: 100%;height:320px;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { mockEchartData, mockEchartXAxis } from './mock'

export default {
  name: 'TabBrandEcharts',
  props: {
    xAxis: {
      type: Object,
      default: () => {}
    },
    series: {
      series: {
        type: Array,
        default: () => []
      }
    }
  },
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '20px',
          itemGap: 20,
          itemHeight: 3,
          icon: 'roundRect',
          data: ['销售额', '销量']
        },
        grid: {
          left: '20px',
          right: '20px',
          bottom: '30px',
          containLabel: true
        },
        xAxis: mockEchartXAxis,
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
          }
        },
        color: ECHARTS_COLORS,
        // series: [{
        //   type: 'line',
        //   data: mockEchartData
        // }],
        series: mockEchartData
      }
    }
  },
  methods: {
    init () {
      const myChart = echarts.init(this.$refs.chart)
      myChart.setOption(this.option)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
