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
                 <Chart-For-Brand
                  style="width: 100%; height: 500px"
                  :brandData="brandChart"
                  ref="brandEchart"/>
              </div>

              <Title title="按子品牌展开"/>

              <Brand-Table-Brands
                :brands="brands"
                :activeBrand="activeBrand"
                @changeActiveBrand="changeActiveBrand"/>

              <Table-For-Brand
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
              <div class="flex-between m-b-10">
                <Echarts-Buttons
                  :activeVal="viewItemVal"
                  style="width: 100%"
                  @handleEchartsClick="handleEchartsClick"/>

                <Month-Options
                  :monthOption="monthOption"
                  :selectdMonth="selectdMonth"
                  @handleSelectdMonth="handleSelectdMonth"/>
              </div>
              <Chart-For-Shop  style="width: 100%; height: 500px"/>
              <Title title="按品牌展开"/>
              <div class="flex-between m-b-10">
                <Brand-Table-Brands
                  :brands="brands"
                  :activeBrand="activeBrand"
                  @changeActiveBrand="changeActiveBrand"/>
                 <Month-Options
                  :monthOption="monthOption"
                  :selectdMonth="selectdMonth"
                  @handleSelectdMonth="handleSelectdMonth"/>
              </div>
               <Table-For-Shop
                ref="tableForShop"
                :tableData="tableData"/>
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
import TableForBrand from '@/views/brand/components/TableForBrand.vue'
import ChartForBrand from '@/views/brand/components/ChartForBrand.vue'
import ChartForShop from '@/views/brand/components/ChartForShop.vue'
import TableForShop from '@/views/brand/components/TableForShop.vue'
import { mockTableData, mockEchartData, mockEchartXAxis, mockBrandChartData } from '@/mock'
import { mapState } from 'vuex'
import { getMonthOption } from '@/api/brand'

export default {
  components: {
    BrandSetting,
    BrandTableBrands,
    TableForBrand,
    ChartForBrand,
    ChartForShop,
    TableForShop
  },
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
      brandChart: mockBrandChartData,
      monthOption: [],
      selectdMonth: {}
    }
  },
  computed: {
    hasBrandFormParam () {
      return Object.keys(this.brandFormParam).length !== 0
    },
    ...mapState('brand', ['brands'])
  },
  methods: {
    handleSettingParam (param) {
      this.brandFormParam = param
      this.activeBrand = this.brands[0].brandId
      console.info(param)
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
    changeActiveBrand (data) {
      console.info(data)
      this.activeBrand = data.brandId
    },
    handleSelectdMonth () {

    },
    async getMonthOption () {
      const res = await getMonthOption({ range: this.rangeItemVal, group: this.groupItemVal })
      if (res.code === 200) {
        this.monthOption = res.result
      } else {
        this.$message.error('行业分类月份列表请求失败')
      }
    }
  },
  mounted () {
    this.getMonthOption().then((res) => {
      this.selectdMonth = this.monthOption[0]
    })
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
