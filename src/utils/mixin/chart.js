// chart 自适应

import { mapState } from 'vuex'
import echarts from 'echarts'
import { debounce } from '@/utils/common.js'
export default {
  data () {
    return {
      chart: null
    }
  },
  watch: {
    collapsed: {
      handler: function () {
        if (this.chart) {
          this.chart.resize()
        }
      }
    }
  },
  computed: {
    ...mapState('sys', ['collapsed'])
  },
  methods: {
    resizeHandle () {
      debounce(this.chart.resize)
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    window.addEventListener('resize', this.resizeHandle)
  }
}
