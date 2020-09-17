<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { yAxisFormatter, xAxisDateFormatter, thousands, callMax, callMin, callInterval } from '@/utils/chart.js'
export default {
  name: 'ChartForIndustry',
  props: {
    industryEchart: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    industryEchart: {
      deep: true,
      handler: function (params) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      const minGmv = callMin(this.industryEchart.gmvList)
      const maxGmv = callMax(this.industryEchart.gmvList)
      const minSales = callMin(this.industryEchart.salesList)
      const maxSales = callMax(this.industryEchart.salesList)
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket) {
            const xAxis = params[0].name
            const gmv = params[0].marker + params[0].seriesName + ': ' + thousands(params[0].value)
            const sales = params[1].marker + params[1].seriesName + ': ' + thousands(params[1].value)
            return xAxisDateFormatter(xAxis) + '<br />' + gmv + '<br />' + sales
          }
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
        xAxis: {
          type: 'category',
          // x轴线
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
            show: false,
            interval: 0,
            rotate: 0,
            textStyle: {
              fontSize: '14',
              color: '#727484'
            },
            formatter: function (value) {
              return xAxisDateFormatter(value)
            }
          },
          data: this.industryEchart.xlist
        },
        yAxis: [
          {
            type: 'value',
            position: 'left',
            min: 0,
            max: maxGmv,
            interval: callInterval(minGmv, maxGmv),
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
          }, {
            type: 'value',
            position: 'right',
            min: 0,
            max: maxSales,
            interval: callInterval(minSales, maxSales),
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
          }
        ],
        color: ECHARTS_COLORS,
        series: [
          {
            name: '销售额',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            data: this.industryEchart.gmvList
          }, {
            name: '销量',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            yAxisIndex: 1,
            data: this.industryEchart.salesList
          }
        ]
      })
      this.chart.resize()
    }
  }
}
</script>
