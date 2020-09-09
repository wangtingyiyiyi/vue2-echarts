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
      chart: null
    }
  },
  props: {
    seriesData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    seriesData: {
      deep: true,
      immediate: true,
      handler: function (param) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        this.chart.setOption({
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
            data: this.seriesData,
            type: 'line'
          }],
          color: ECHARTS_COLORS
        })
        this.chart.resize()
      })
    }
  }
}
</script>
