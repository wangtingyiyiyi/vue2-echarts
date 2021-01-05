<template>
    <div ref="chart" style="width: 100%;height:320px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'ChartPartPie',
  data () {
    return {
      chart: null,
      legendData: [],
      seriesData: [],
      selected: {},
      option: {
        title: {
          text: '同名数量统计',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['衬衫', '羊毛衫', '雪纺衫'],

          selected: { name: '衬衫', value: '1' }
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [{ name: '衬衫', value: '1' }, { name: '羊毛衫', value: '1' }, { name: '雪纺衫', value: '1' }],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.init(50)
  },
  methods: {
    init (count) {
      if (this.chart !== null) {
        // this.chart.clear()
      }
      this.chart.setOption(this.option)
      this.chart.resize()
    }
  }
}

</script>
