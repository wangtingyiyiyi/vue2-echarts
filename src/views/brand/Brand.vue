<template>
  <div>
    <Brand-Setting @brandOnSubmit="handleSettingParam"/>
    <Empty-Line />

    <div class="brand-tab-wapper">
      <el-tabs v-model="activeName" style='width:100%'>
          <el-tab-pane label="品牌概览" name="brand" lazy>
            <div v-show="hasBrandFormParam">
              <Title title="总销售趋势"/>

              <Echarts-Buttons
                  :activeVal="viewItemVal"
                  style="width: 100%"
                  class="m-b-5"
                  @handleEchartsClick="handleEchartsClick"/>

              <div ref="brandEchart">
                 <Brand-Chart
                  style="width: 100%; height: 500px"
                  :brandData="brandChart"
                  ref="brandEchart"/>
              </div>

              <Title title="按子品牌展开"/>

              <Brand-Table-Brands
                :brands="brands"
                :activeBrand="activeBrand"
                @changeActiveBrand="changeActiveBrand"/>

              <Tab-Brand-Table
                ref="table"
                :tableData="tableData"/>
            </div>
            <div v-show="!hasBrandFormParam">
              <Title title="总销售趋势"/>
              <Svg-Icon icon-class="empty" class="empty-svg"/>
              <Title title="按子品牌展开"/>
              <Svg-Icon icon-class="empty" class="empty-svg"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="店铺数据" name="shop" lazy>
              <Title title="总销售趋势"/>
              <div>echarts</div>
              <Title title="按子品牌展开"/>
              <div>table</div>
          </el-tab-pane>
      </el-tabs>

      <Range-Buttons
        :activeVal="rangeItemVal"
        @handleRangeClick="handleRangeClick"
        style='position: absolute; right:350px; top:17px;'/>
      <Group-Buttons
        :activeVal="groupItemVal"
        @handleGroupClick="handleGroupClick"
        style='position: absolute; right:10px; top:17px;'/>
    </div>

  </div>
</template>

<script>
import BrandSetting from '@/views/brand/components/BrandSetting.vue'
import BrandTableBrands from '@/views/brand/components/TableBrands.vue'
import TabBrandTable from '@/views/brand/components/TabBrandTable.vue'
import BrandChart from '@/views/brand/components/BrandChart.vue'
import { mockTableData, mockEchartData, mockEchartXAxis, mockBrandChartData } from '@/mock'

export default {
  components: { BrandSetting, BrandTableBrands, TabBrandTable, BrandChart },
  data () {
    return {
      activeName: 'brand',
      viewItemVal: '0',
      rangeItemVal: '1',
      groupItemVal: '0',
      brandFormParam: {},
      mockTableData: mockTableData,
      mockEchartData: mockEchartData,
      mockEchartXAxis: mockEchartXAxis,
      tableData: [],
      activeBrand: '',
      brands: [],
      brandChart: mockBrandChartData
    }
  },
  computed: {
    hasBrandFormParam () {
      return Object.keys(this.brandFormParam).length !== 0
    }
  },
  methods: {
    handleSettingParam (param) {
      this.brandFormParam = param
      setTimeout(() => {
        this.brandChart = JSON.parse(JSON.stringify(mockBrandChartData))
      }, 1000)
    },
    handleRangeClick (data) {
      this.rangeItemVal = data.value
    },
    handleGroupClick (data) {
      this.groupItemVal = data.value
    },
    handleEchartsClick (data) {
      this.viewItemVal = data.value
    },
    changeActiveBrand () {

    }
  }
}
</script>

<style lang="stylus" scoped>
.brand-tab-wapper
  background-color #ffffff
  position relative

.brand-tab-wapper >>> .el-tabs__item
  padding-left 25px !important
  font-size 16px
  line-height 56px
  height 56px

</style>
