<template>
  <div ref="chart" style="width: 100%;height:320px;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS, ECHARTS_ACTIVED_PARAM } from '@/utils/const.js'
import { yAxisFormatter, callMax, computePercent } from '@/utils/chart.js'

export default {
  name: 'BrandChart',
  props: {
    brandEchart: {
      type: Object,
      default: () => {}
    },
    salesItemVal: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      chart: null,
      legendData: []
    }
  },
  watch: {
    brandEchart: {
      deep: true,
      handler: function (params) {
        this.legendData = ECHARTS_ACTIVED_PARAM[this.salesItemVal]
        this.init()
      }
    }
  },
  methods: {
    init () {
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
        legend: {
          right: '20px',
          itemGap: 20,
          itemHeight: 3,
          icon: 'roundRect',
          data: this.legendData
        },
        grid: {
          left: '20px',
          right: '20px',
          bottom: '30px',
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
              show: false,
              interval: 0,
              rotate: 40,
              textStyle: {
                fontSize: '10',
                color: '#727484'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: callMax(this.brandEchart.salesList),
            interval: Math.ceil(callMax(this.brandEchart.salesList) / 5),
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
            data: this.brandEchart.salesList
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
