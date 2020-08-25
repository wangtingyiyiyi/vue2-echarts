<template>
  <div class="p-30">
    <Title title="总销售趋势"/>

    <Echarts-Buttons
      @handleEchartsClick="handleEchartsClick"/>

    <Tab-Brand-Echarts />

    <Title title="按子品牌展开"/>

    <Brand-Table-Brands
      class="brand-padding"
      :brands="mockBrands" @changeActiveBrand="changeActiveBrand"/>

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
import { tableData, mockBrands } from './mock'
import { Loading } from 'element-ui'

export default {
  name: 'BrandTabBrand',
  components: { EchartsButtons, BrandTableBrands, TabBrandTable, TabBrandEcharts },
  data () {
    return {
      mockBrands: mockBrands,
      tableData: tableData
    }
  },
  computed: {
    tableBody () {
      return this.$refs.table.$refs.table.$refs.bodyWrapper
    }
  },
  methods: {
    handleEchartsClick (item) {
      console.info(item)
    },
    changeActiveBrand (item) {
      console.info(item)
      const loadingInstance = Loading.service({
        target: this.tableBody,
        text: '正在加载数据...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loadingInstance.close()
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.brand-padding
  padding 20px 0 10px
</style>
