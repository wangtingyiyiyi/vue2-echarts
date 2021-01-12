<template>
<div>
  <slot name="tips"/>
  <div ref="chart" style="width: 100%;height: calc(100% - 14px);"></div>
</div>
</template>

<script>
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'

export default {
  name: 'ChartOfMap',
  data () {
    return {
      chart: null
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
        this.chart.setOption({
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
              itemStyle: {
                borderColor: '#eeeeee'
              },
              label: {
                formatter: function (params) {
                  return params.name + '\n' + params.value
                }
              },
              data: [
                {
                  value: 1,
                  name: '北京'
                },
                {
                  value: 2,
                  name: '天津'
                },
                {
                  value: 3,
                  name: '河北'
                },
                {
                  value: 4,
                  name: '山西'
                },
                {
                  value: 5,
                  name: '内蒙古'
                },
                {
                  value: 6,
                  name: '辽宁'
                },
                {
                  value: 7,
                  name: '吉林'
                },
                {
                  value: 8,
                  name: '黑龙江'
                },
                {
                  value: 9,
                  name: '上海'
                },
                {
                  value: 10,
                  name: '江苏'
                },
                {
                  value: 11,
                  name: '浙江'
                },
                {
                  value: 12,
                  name: '安徽'
                },
                {
                  value: 13,
                  name: '福建'
                },
                {
                  value: 14,
                  name: '江西'
                },
                {
                  value: 15,
                  name: '山东'
                },
                {
                  value: 16,
                  name: '河南'
                },
                {
                  value: 17,
                  name: '湖北'
                },
                {
                  value: 18,
                  name: '湖南'
                },
                {
                  value: 19,
                  name: '广东'
                },
                {
                  value: 20,
                  name: '广西'
                },
                {
                  value: 21,
                  name: '海南'
                },
                {
                  value: 22,
                  name: '重庆'
                },
                {
                  value: 23,
                  name: '四川'
                },
                {
                  value: 24,
                  name: '贵州'
                },
                {
                  value: 25,
                  name: '云南'
                },
                {
                  value: 26,
                  name: '西藏'
                },
                {
                  value: 27,
                  name: '陕西'
                },
                {
                  value: 28,
                  name: '甘肃'
                },
                {
                  value: 29,
                  name: '青海'
                },
                {
                  value: 30,
                  name: '宁夏'
                },
                {
                  value: 31,
                  name: '新疆'
                },
                {
                  value: 32,
                  name: '台湾'
                },
                {
                  value: 33,
                  name: '香港'
                },
                {
                  value: 34,
                  name: '澳门'
                }, {
                  value: 35,
                  name: '南海诸岛'
                }
              ]
            }
          ]
        })
        this.chart.resize()
        this.chart.on('click', (params) => {
          console.info(params)
          this.$emit('handleMapClick', params.data)
        })
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
