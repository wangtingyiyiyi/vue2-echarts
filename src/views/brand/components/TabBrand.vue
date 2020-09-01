<template>
  <div>
    <Title title="总销售趋势"/>

    <Echarts-Buttons
      :activeVal="activeButton"
      @handleEchartsClick="handleEchartsClick"/>

    <Tab-Brand-Echarts
      ref="brandEchart"/>

    <Title title="按子品牌展开"/>

    <Brand-Table-Brands
      :brands="brands"
      :activeBrand="activeBrand"
      @changeActiveBrand="changeActiveBrand"/>

    <Tab-Brand-Table
      ref="table"
      :tableData="tableData"/>

  </div>
</template>
<script>
import EchartsButtons from '@/views/brand/components/EchartsButtons.vue'
import BrandTableBrands from '@/views/brand/components/TableBrands.vue'
import TabBrandTable from '@/views/brand/components/TabBrandTable.vue'
import TabBrandEcharts from '@/views/brand/components/TabBrandEcharts.vue'
import { mockTableData, mockEchartData, mockEchartXAxis } from './mock'

import { Loading } from 'element-ui'
import { mapState } from 'vuex'

export default {
  name: 'BrandTabBrand',
  components: { EchartsButtons, BrandTableBrands, TabBrandTable, TabBrandEcharts },
  props: {
    settingParam: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      mockTableData: mockTableData,
      mockEchartData: mockEchartData,
      mockEchartXAxis: mockEchartXAxis,
      tableData: [],
      activeBrand: '',
      activeButton: 'sumSalescount'
    }
  },
  computed: {
    ...mapState('brand', ['brands']),
    tableBody () {
      return this.$refs.table.$refs.table.$refs.bodyWrapper
    }
  },
  watch: {
    brands: {
      deep: true,
      handler: function (params) {
        if (params.length > 0) {
          this.changeActiveBrand(params[0])
        }
      }
    }
  },
  methods: {
    handleEchartsClick (item) {
      this.activeButton = item.value
    },
    changeActiveBrand (item) {
      this.activeBrand = item.brandId
      const loadingInstance = Loading.service({
        target: this.tableBody,
        text: '正在加载数据...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        this.tableData = this.mockTableData
        loadingInstance.close()
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
