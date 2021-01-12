<template>
<div>
  <slot name="tips"/>
  <div ref="chart" style="width: 100%;height: calc(100% - 14px);"></div>
</div>
</template>

<script>
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
import { MOCK_CHART_FOR_MAP } from '@/views/dp-category/mock.js'

export default {
  name: 'ChartOfMap',
  data () {
    return {
      chart: null,
      currentName: '',
      option: {
        visualMap: {
          show: false,
          min: 0,
          max: 35,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#e6e6e6', '#ebf3fc', '#c7ddf6', '#92bdee', '#3987e0']
          }
        },
        series: [
          {
            name: 'china 地图',
            type: 'map',
            map: 'china',
            top: 15,
            selectedMode: 'single',
            itemStyle: {
              borderColor: '#eeeeee'
            },
            label: {
              formatter: function (params) {
                return params.name + '\n' + params.value
              }
            },
            data: MOCK_CHART_FOR_MAP
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
          this.reload(params.name)
          this.$emit('handleMapClick', params.data)
        })
      })
    },
    reload (name) {
      this.currentName = name
      MOCK_CHART_FOR_MAP.forEach(item => {
        item.selected = item.name === name
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
