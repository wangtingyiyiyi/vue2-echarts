<template>
  <div ref="chart" style="width: 100%;height:320px;"></div>
</template>

<script>
import echarts from 'echarts'
import { ECHARTS_COLORS } from '@/utils/const.js'
export default {
  name: 'LineAndLineChart',
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
        legend: {
          right: '20px',
          itemGap: 20,
          itemHeight: 3,
          icon: 'roundRect',
          data: ['蒸发量', '平均温度']
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
            data: ['花西子', 'PERFECT DIARY/完美日记', 'COLOR KEY', '小奥汀', 'CARSLAN/卡姿兰', 'MAC/魅可', 'YSL/圣罗兰', '3CE/三熹玉', 'ZEESEA/滋色', 'GIORGIO ARMANI/阿玛尼', 'Maybelline/美宝莲', 'red earth/红地球'],
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
            max: 4800,
            interval: 800,
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
              formatter: '{value} 万'
            }
          },
          {
            type: 'value',
            min: 0,
            max: 200,
            interval: 40,
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
            name: '蒸发量',
            type: 'bar',
            barWidth: '9px',
            data: [2232, 2492, 1410, 2322, 2566, 1617, 1356, 3162, 3126, 1200, 2164, 3300]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            smooth: true,
            data: [20, 22, 33, 45, 63, 102, 183, 134, 160, 165, 120, 62]
          }
        ],
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
