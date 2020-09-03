<template>
  <div ref="chart" style="width: 100%;height:60px;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'

export default {
  name: 'LineInTable',
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 0,
          data: [820, 820, 820, 820, 820, 820, 1320],
          type: 'line'
        }],
        color: ECHARTS_COLORS
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
