<template>
  <div ref="chart" style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { callMax, yAxisFormatter, callMin, tooltipMarkerReplace, tooltipMarkerMargin, tooltipMarkerWeight, thousands } from '@/utils/chart.js'

export default {
  name: 'ChartForProvince',
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    },
    reload: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    reload: {
      handler: function (reload) {
        if (reload) {
          this.init()
        }
      }
    }
  },
  data () {
    return {
      chart: null,
      ECHARTS_COLORS,
      scale: Math.ceil(callMax(this.chartData.current) / 4), // 比例尺
      increase: 1 // 放大系数
    }
  },
  methods: {
    yAxisFormatter: yAxisFormatter,
    init () {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        const that = this
        this.chart.setOption({
          color: ECHARTS_COLORS,
          title: {
            text: this.title,
            left: 50,
            top: 15,
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            padding: [5, 10, 13, 10],
            extraCssText: 'width: 170px; box-shadow: 0 10px 24px rgba(29, 42, 68, 0.2);',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            textStyle: {
              color: '#727487'
            },
            axisPointer: {
              type: 'cross'
            },
            formatter: function (params) {
              const xAxis = params[0].name
              let str = ''
              params.forEach((item, index) => {
                let value = item.value
                if (item.seriesName === '关店数') {
                  value = item.value / that.increase * -1
                }
                str = str + tooltipMarkerReplace(item.marker) + item.seriesName + ':' + tooltipMarkerWeight(thousands(value)) + '<br />'
              })
              return tooltipMarkerMargin(xAxis) + '<br />' + str
            }
          },
          grid: {
            left: 30,
            right: '4%',
            bottom: '1%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#D9D9D9FF'
                }
              },
              data: this.chartData.xlist
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: this.scale * -1,
              max: callMax(this.chartData.current),
              interval: Math.ceil(callMax(this.chartData.current) / 4),
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  type: 'dotted',
                  color: ['#EBEBEBFF']
                }
              },
              axisLabel: {
                formatter: function (value) {
                  if (value >= 0) {
                    return value
                  }
                }
              }
            },
            {
              type: 'value',
              min: -Math.ceil(callMax(this.chartData.all) / 4),
              max: callMax(this.chartData.all),
              interval: Math.ceil(callMax(this.chartData.all) / 4),
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  type: 'dotted',
                  color: ['#EBEBEBFF']
                }
              },
              axisLabel: {
                formatter: function (value) {
                  if (value >= 0) {
                    return yAxisFormatter(value)
                  }
                }
              }
            }
          ],
          series: [
            {
              name: '开店数',
              type: 'bar',
              barWidth: 8,
              stack: '总量',
              data: this.chartData.current
            },
            {
              name: '关店数',
              type: 'bar',
              stack: '总量',
              barWidth: 8,
              data: this.handleIncrease(this.chartData.close)
            },
            {
              name: '现有门店',
              type: 'line',
              yAxisIndex: 1,
              data: this.chartData.all
            }
          ]
        })
        this.chart.resize()
      })
    },
    handleIncrease (arr) {
      const min = callMin(arr)
      this.increase = parseInt(this.scale / min) * -1 / 2
      return arr.map(item => item * this.increase)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
