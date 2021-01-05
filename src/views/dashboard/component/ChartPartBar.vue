<template>
    <div ref="chart" style="width: 100%;height:320px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'ChartPartBar',
  data () {
    return {
      chart: null,
      option: {
        title: {
          text: '柱状图'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.init()
  },
  methods: {
    init () {
      if (this.chart !== null) {
        // this.chart.clear()
      }
      this.chart.setOption(this.option)
      this.chart.resize()
    }
  }
}

</script>
