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
                :brands="brandList"
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
          <el-tab-pane label="SPU" name="spu">
            <div class="flex-between m-b-10">
              <Brand-Table-Brands
                :brands="brandList"
                :activeBrand="activeBrand"
                @changeActiveBrand="changeActiveBrand"/>
                <Month-Options
                :monthOption="monthOption"
                :selectdMonth="tableMonth"
                @handleSelectdMonth="handleTableMonth"/>
            </div>
            <Table-For-Spu :tableData="mockBrandSpuData"/>
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
import TableForSpu from '@/views/brand/components/TableForSpu.vue'
import ChartForBrand from '@/views/brand/components/ChartForBrand.vue'
// import ChartForShop from '@/views/brand/components/ChartForShop.vue'
// import TableForShop from '@/views/brand/components/TableForShop.vue'
import { mockBrandChartData, mockBrandSpuData } from '@/mock'
import { mapState } from 'vuex'
import { getMonthOption, getTableForBrandShop, getChartForBrandShop } from '@/api/brand'
import { deleteEmptyKeyVal } from '@/utils/common.js'

export default {
  components: {
    BrandSetting,
    BrandTableBrands,
    TableForBrand,
    ChartForBrand,
    TableForSpu
    // ChartForShop,
    // TableForShop
  },
  data () {
    return {
      activeName: 'brand',
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
      isLoadingOfBrandTable: false,
      shopTableChart: {},
      mockBrandSpuData: mockBrandSpuData
    }
  },
  computed: {
    hasBrandFormParam () {
      return Object.keys(this.brandList).length !== 0
    },
    ...mapState('brand', ['brandList', 'cateList'])
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
      this.activeBrand = this.brandList[0]
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
    async getChartForShop () {
      if (!this.activeBrand.brandId || this.activeName !== 'shop') return ''
      const param = {
        group: this.groupItemVal,
        view: this.viewItemVal,
        brandList: this.brandList,
        cateList: [deleteEmptyKeyVal(this.cateList[0])],
        tmallMonthList: this.selectdMonth
      }
      const res = await getChartForBrandShop(param)
      if (res.code === 200) {
        this.shopTableChart = res.result
      } else {
        this.$message.error('')
      }
    },
    // 店铺 table
    async getTableForShop () {
      if (!this.activeBrand.brandId || this.activeName !== 'shop') return ''
      const param = {
        range: this.rangeItemVal,
        group: this.groupItemVal,
        sort: this.sortItemVal,
        cateList: [deleteEmptyKeyVal(this.cateList[0])],
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
