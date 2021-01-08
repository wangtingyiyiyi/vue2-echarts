<template>
  <div ref="chart" style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { callMax, yAxisFormatter, callMin } from '@/utils/chart.js'
// import { callMin, callMax, yAxisFormatter } from '@/utils/chart.js'

export default {
  name: 'ChartForProvince',
  props: {
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      chart: null,
      ECHARTS_COLORS
    }
  },
  methods: {
    callMax: callMax,
    callMin: callMin,
    yAxisFormatter: yAxisFormatter,
    init () {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        this.chart.setOption({
          color: ECHARTS_COLORS,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              data: this.chartData.xlist
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: callMin(this.chartData.close),
              max: callMax(this.chartData.current),
              interval: Math.ceil(callMax(this.chartData.current) - 96 / 5),
              // minInterval: callMax(this.chartData.current) / 4,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  // type: 'dotted'
                  // color: '#ff0000'
                }
              },
              axisLabel: {
                formatter: function (value) {
                  return value
                }
              }
            }
            // {
            //   type: 'value',
            //   min: -callMax(this.chartData.all) / 4,
            //   max: callMax(this.chartData.all),
            //   splitNumber: 5,
            //   axisLine: {
            //     show: false
            //   },
            //   axisTick: {
            //     show: false
            //   },
            //   splitLine: {
            //     lineStyle: {
            //       color: '#ff0000',
            //       type: 'dotted'
            //     }
            //   },
            //   axisLabel: {
            //     formatter: function (value) {
            //       if (value >= 0) {
            //         return yAxisFormatter(value)
            //       }
            //     }
            //   }
            // }
          ],
          series: [
            {
              name: '收入',
              type: 'bar',
              stack: '总量',
              barWidth: 8,
              data: this.chartData.current
            },
            {
              name: '支出',
              type: 'bar',
              stack: '总量',
              barWidth: 15,
              data: this.chartData.close
            }
            // {
            //   name: 'all',
            //   type: 'line',
            //   yAxisIndex: 1,
            //   data: this.chartData.all
            // }
          ]
        })
        this.chart.resize()
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
