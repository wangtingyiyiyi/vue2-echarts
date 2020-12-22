<template>
  <div ref="chart" style="width: 100%;height:320px;"></div>
</template>

<script>
import { ECHARTS_COLORS, ECHARTS_ACTIVED_PARAM } from '@/utils/const.js'
import { yAxisFormatter, callMax, computePercent, thousands, brandFormatter, xIndustryAxisDateSplit } from '@/utils/chart.js'
import chartMixin from '@/utils/mixin/chart.js'

export default {
  name: 'ChartForBrand',
  mixins: [chartMixin],
  props: {
    brandEchart: {
      type: Object,
      default: () => {}
    },
    viewItemVal: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      legendData: []
    }
  },
  watch: {
    brandEchart: {
      deep: true,
      handler: function (params) {
        this.legendData = ECHARTS_ACTIVED_PARAM[this.viewItemVal]
        this.init()
      }
    }
  },
  methods: {
    init () {
      const tempKey = this.viewItemVal === 'gmv' ? 'gmvList' : 'salesList'
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket) {
            const xAxis = params[0].name
            const gmv = params[0].marker + params[0].seriesName + ': ' + thousands(params[0].value)
            const sales = params[1].marker + params[1].seriesName + ': ' + thousands(params[1].value)
            return brandFormatter(xAxis) + '<br />' + gmv + '<br />' + sales
          }
        },
        legend: {
          show: false,
          right: '70px',
          itemGap: 40,
          itemWidth: 12,
          itemHeight: 3,
          icon: 'roundRect',
          data: this.legendData,
          textStyle: {
            padding: [0, 0, 0, 10]
          }
        },
        grid: {
          left: '20px',
          right: '20px',
          bottom: '30px',
          top: '37px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.brandEchart.xlist,
            axisPointer: {
              type: 'shadow'
            },
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
              show: true,
              interval: 0,
              rotate: 0,
              fontFamily: 'Arial',
              textStyle: {
                fontSize: '12',
                color: '#727484'
              },
              formatter: function (value, index) {
                return xIndustryAxisDateSplit(value, index)
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: callMax(this.brandEchart[tempKey]),
            interval: Math.ceil(callMax(this.brandEchart[tempKey]) / 5),
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
              showMinLabel: false,
              formatter: function (value) {
                return yAxisFormatter(value)
              }
            }

          },
          {
            type: 'value',
            min: 0,
            max: 100,
            interval: 20,
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
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: this.legendData[0],
            type: 'bar',
            barWidth: '9px',
            data: this.brandEchart[tempKey]
          },
          {
            name: this.legendData[1],
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            smooth: true,
            data: computePercent(this.brandEchart.percentList)
          }
        ],
        color: ECHARTS_COLORS
      })
      this.chart.resize()
    }
  }
}
</script>
