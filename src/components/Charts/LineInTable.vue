<template>
  <div ref="chart" style="width: 100%;height:60px;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { xAxisDateFormatter, thousands } from '@/utils/chart.js'

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
    },
    xAxisData: {
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
            confine: true,
            extraCssText: 'text-align: left',
            formatter: function (params, ticket) {
              const xAxis = params[0].name
              const gmv = params[0].marker + 'GMV: ' + thousands(params[0].value)
              return xAxisDateFormatter(xAxis) + '<br />' + gmv
            }
          },
          xAxis: {
            type: 'category',
            show: false,
            boundaryGap: false,
            data: this.xAxisData
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
