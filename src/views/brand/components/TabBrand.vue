<template>
  <div>
    <Title title="总销售趋势"/>

    <Echarts-Buttons
      :activeVal="activeButton"
      @handleEchartsClick="handleEchartsClick"/>

    <Line-Chart
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
import { mockTableData, mockEchartData, mockEchartXAxis } from '@/mock'
import { mapState } from 'vuex'
import { refLoading } from '@/utils/element.js'

export default {
  name: 'BrandTabBrand',
  components: { EchartsButtons, BrandTableBrands, TabBrandTable },
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
      const loadingInstance = refLoading(this.tableBody)
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
