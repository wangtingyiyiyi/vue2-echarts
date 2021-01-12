<template>
  <div ref="chart" style="width: 100%;height: 100%;"></div>
</template>

<script>
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
import { ECHARTS_COLORS } from '@/utils/const.js'
import { tooltipMarkerReplace, tooltipMarkerMargin, tooltipMarkerWeight, thousands } from '@/utils/chart.js'
import { MOCK_CHART_FOR_CITY_DATA, MOCK_CHART_FOR_CITY_XAXIS } from '@/views/dp-category/mock.js'

export default {
  name: 'ChartOfCity',
  data () {
    return {
      chart: null,
      currentIndex: '',
      option: {
        color: ECHARTS_COLORS,
        tooltip: {
          trigger: 'axis',
          padding: [5, 10, 13, 10],
          extraCssText: 'width: 170px; box-shadow: 0 10px 24px rgba(29, 42, 68, 0.2);',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          textStyle: {
            color: '#727487'
          },
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            const name = params[0].name
            let str = ''
            params.forEach((item, index) => {
              str = str + tooltipMarkerReplace(item.marker) + item.seriesName + ':' + tooltipMarkerWeight(thousands(item.value)) + '<br />'
            })
            return tooltipMarkerMargin(name) + '<br />' + str
          }
        },
        xAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        grid: {
          left: 15,
          top: '10%',
          right: '4%',
          width: '100%',
          height: '90%',
          containLabel: true
        },
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: '#00000073'
            },
            axisLine: {
              lineStyle: {
                color: '#D9D9D9FF'
              }
            },
            data: MOCK_CHART_FOR_CITY_XAXIS
          }
        ],
        series: [
          {
            name: '利润',
            type: 'bar',
            barWidth: 10,
            selectedMode: 'single',
            label: {
              show: true,
              position: 'right',
              color: '#8C8C8C'
            },
            data: MOCK_CHART_FOR_CITY_DATA
          }
        ]
      }
    }
  },
  props: {
    seriesData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        echarts.registerMap('china', china)
        this.chart = echarts.init(this.$refs.chart)
        this.chart.setOption(this.option)
        this.chart.resize()
        this.chart.on('click', (params) => {
          this.reload(params.dataIndex)
          console.info(params)
          this.$emit('handleMapClick', { name: params.name, data: params.data })
        })
      })
    },
    reload (index) {
      this.currentIndex = index
      MOCK_CHART_FOR_CITY_DATA.forEach((item, idx) => {
        // item.selected = idx === this.currentIndex
        console.info(idx === this.currentIndex)
        return item
      })
      this.chart.setOption(this.option)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
