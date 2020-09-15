<template>
  <div>
    <Brand-Setting @brandOnSubmit="handleSettingParam"/>
    <Empty-Line />

    <div class="brand-tab-wapper">
      <el-tabs v-model="activeName" style='width:100%' @tab-click="handleTabClick">
          <el-tab-pane label="品牌概览" name="brand">
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
                class="m-b-10"
                @changeActiveBrand="changeActiveBrand"/>

              <Table-For-Brand
                ref="table"
                :tableData="brandTableData"/>
            </div>
            <div v-show="!hasBrandFormParam">
              <Title title="总销售趋势"/>
              <Svg-Icon icon-class="empty" class="empty-svg"/>
              <Title title="按子品牌展开"/>
              <Svg-Icon icon-class="empty" class="empty-svg"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="店铺数据" name="shop">
            <div v-show="hasBrandFormParam">
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
              <div ref="chartForShop">
                <Chart-For-Shop style="width: 100%; height: 500px"/>
              </div>
              <Title title="按品牌展开"/>
              <div class="flex-between m-b-10">
                <Brand-Table-Brands
                  :brands="brands"
                  :activeBrand="activeBrand"
                  @changeActiveBrand="changeActiveBrand"/>
                 <Month-Options
                  :monthOption="monthOption"
                  :selectdMonth="tableMonth"
                  @handleSelectdMonth="handleTableMonth"/>
              </div>
               <Table-For-Shop
                ref="tableForShop"
                :isLoading="isLoadingOfShopTable"
                :sortItemVal="sortItemVal"
                :tableData="shopTableData"
                @changeSortItemVal="changeSortItemVal"/>
              </div>

              <div v-show="!hasBrandFormParam">
                <Title title="总销售趋势"/>
                <Svg-Icon icon-class="empty" class="empty-svg"/>
                <Title title="按品牌展开"/>
                <Svg-Icon icon-class="empty" class="empty-svg"/>
              </div>
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
import { mockBrandChartData } from '@/mock'
import { mapState } from 'vuex'
import { getMonthOption, getTableForBrandShop } from '@/api/brand'

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
      activeName: 'shop',
      viewItemVal: '0',
      rangeItemVal: '1',
      groupItemVal: '0',
      sortItemVal: '1',
      brandTableData: [],
      shopTableData: [],
      activeBrand: {},
      brandChart: mockBrandChartData,
      monthOption: [],
      selectdMonth: {},
      tableMonth: {},
      isLoadingOfShopTable: false,
      isLoadingOfBrandTable: false
    }
  },
  computed: {
    hasBrandFormParam () {
      return Object.keys(this.brands).length !== 0
    },
    ...mapState('brand', ['brands'])
  },
  methods: {
    // 切换tab
    handleTabClick () {
      this.getChartForBrand()
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForShop()
    },
    // 配置筛选 搜索
    handleSettingParam () {
      this.activeBrand = this.brands[0]
      this.getChartForBrand()
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForShop()
    },
    // 切换范围
    handleRangeClick (data) {
      this.rangeItemVal = data.value
      this.getMonthOption().then(() => {
        this.getChartForBrand()
        this.getChartForBrand()
        this.getTableForBrand()
        this.getTableForShop()
      })
    },
    // 切换颗粒度
    handleGroupClick (data) {
      this.groupItemVal = data.value
      this.getMonthOption().then((res) => {
        this.getChartForBrand()
        this.getChartForBrand()
        this.getTableForBrand()
        this.getTableForShop()
      })
    },
    // 切换 销量 或者 销售额
    handleEchartsClick (data) {
      this.viewItemVal = data.value
    },
    // 按品牌查看店铺列表
    changeActiveBrand (data) {
      this.activeBrand = data
      this.getTableForShop()
    },
    // table 切换month
    handleTableMonth (val) {
      this.tableMonth = val
      this.getTableForShop()
    },
    // 列表排序
    changeSortItemVal (val) {
      this.sortItemVal = val
      this.getTableForShop()
    },
    // chart 切换month
    handleSelectdMonth (val) {
      this.selectdMonth = val
    },
    // 获取月份options
    async getMonthOption () {
      const res = await getMonthOption({ range: this.rangeItemVal, group: this.groupItemVal })
      if (res.code === 200) {
        this.monthOption = res.result
        this.selectdMonth = res.result[0]
        this.tableMonth = res.result[0]
      } else {
        this.$message.error('行业分类月份列表请求失败')
      }
    },
    // 品牌 chart
    getChartForBrand () {
      if (!this.activeBrand.brandId || this.activeName !== 'brand') return ''
    },
    // 品牌 table
    getTableForBrand () {
      if (!this.activeBrand.brandId || this.activeName !== 'brand') return ''
    },
    // 店铺 chart
    getChartForShop () {
      if (!this.activeBrand.brandId || this.activeName !== 'shop') return ''
    },
    // 店铺 table
    async getTableForShop () {
      if (!this.activeBrand.brandId || this.activeName !== 'shop') return ''
      const param = {
        range: this.rangeItemVal,
        group: this.groupItemVal,
        sort: this.sortItemVal,
        cateList: [{ outCat1: '面部护肤品' }],
        brandList: [this.activeBrand],
        tmallMonthList: this.tableMonth
      }
      this.isLoadingOfShopTable = true
      const res = await getTableForBrandShop(param)
      this.isLoadingOfShopTable = false
      if (res.code === 200) {
        this.shopTableData = res.result
      } else {
        this.$message.error('品牌店铺列表请求失败')
      }
    }
  },
  mounted () {
    this.getMonthOption()
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
