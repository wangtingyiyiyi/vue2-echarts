<template>
  <div ref="chart" style="width: 100%;height:320px;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { mockEchartData, mockEchartXAxis } from '@/mock.js'
import { yAxisFormatter } from '@/utils/chart.js'

export default {
  name: 'LineChart',
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
      average: 0,
      mockEchartData: mockEchartData,
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
          left: '30px',
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
          },
          axisLabel: {
            formatter: function (value) {
              return yAxisFormatter(value)
            }
          }
        },
        color: ECHARTS_COLORS,
        series: mockEchartData
      }
    }
  },
  methods: {
    init () {
      const sum = this.mockEchartData[0].data.reduce((a, b) => {
        return a + b
      })
      this.average = parseInt(sum / this.mockEchartData[0].data.length)
      console.info(this.average)
      const myChart = echarts.init(this.$refs.chart)
      myChart.setOption(this.option)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
