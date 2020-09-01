<template>
  <div ref="chart" style="width: 100%;height:300px;"></div>
</template>

<script>
import echarts from 'echarts'
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
          right: '90px',
          data: ['销售额', '销量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: mockEchartXAxis,
        yAxis: {
          type: 'value'
        },
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
