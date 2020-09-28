<template>
  <div>
    <Brand-Setting @brandOnSubmit="handleSettingParam"/>
    <Empty-Line />

    <div class="brand-tab-wapper">
      <el-tabs v-model="activeName" style='width:100%' @tab-click="handleTabClick">
          <el-tab-pane label="品牌概览" name="brand">
            <div v-show="hasBrandFormParam">
              <Title class="m-b-12" title="总销售趋势"/>

              <Echarts-Buttons
                :activeVal="viewItemVal"
                style="width: 100%"
                class="m-b-5"
                @handleEchartsClick="handleEchartsClick"/>

              <div ref="brandEchart">
                 <Chart-For-Brand
                  style="width: 100%; height: 300px"
                  :brandData="brandChart"
                  :viewItemVal="viewItemVal"/>
              </div>

              <Title class="m-b-12" title="按子品牌展开"/>

              <Brand-Table-Brands
                :brands="brandList"
                :activeBrand="activeBrand"
                class="m-b-10"
                @changeActiveBrand="changeActiveBrand"/>

              <Table-For-Brand
                ref="table"
                :sortItemVal="sortItemVal"
                :tableData="brandTableData"
                :isLoading="isLoadingOfBrandTable"
                :paramOfBrandTable="paramOfBrandTable"
                @changeSortItemVal="changeSortItemVal"/>
            </div>
            <div v-show="!hasBrandFormParam">
              <div class="empty-info">请搜索品牌</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="SPU" name="spu">
            <div v-show="hasBrandFormParam">
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
              <Table-For-Spu
                :isLoading="isLoadingOfSpuTable"
                :sortItemVal="sortItemVal"
                :tableData="tableSpu"/>
              <el-pagination
                background
                layout="prev, pager, next"
                class="pagination-wapper"
                @current-change="changeSpuPage"
                :current-page="spuPage"
                :page-size="pageSize"
                :total="spuTotal">
              </el-pagination>
            </div>
            <div v-show="!hasBrandFormParam">
              <div class="empty-info">请搜索品牌</div>
            </div>
          </el-tab-pane>
      </el-tabs>

      <Range-Buttons
        :activeVal="rangeItemVal"
        @handleRangeClick="handleRangeClick"
        style='position: absolute; right:380px; top:16px;'/>
      <Group-Buttons
        :activeVal="groupItemVal"
        @handleGroupClick="handleGroupClick"
        style='position: absolute; right:26px; top:16px;'/>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { refLoading } from '@/utils/element.js'
import componentsMixin from '@/views/brand/components.js'
import {
  getMonthOption,
  getTableForBrandShop,
  getChartForBrandShop,
  getTableForBrand,
  getChartForBrand,
  getTableForBrandSpu
} from '@/api/brand'
export default {
  mixins: [componentsMixin],
  data () {
    return {
      activeName: 'brand',
      viewItemVal: '1',
      rangeItemVal: '1',
      groupItemVal: '0',
      sortItemVal: '1',
      brandTableData: [],
      shopTableData: [],
      activeBrand: {},
      brandChart: [],
      monthOption: [],
      selectdMonth: {},
      tableMonth: {},
      isLoadingOfShopTable: false,
      isLoadingOfBrandTable: false,
      isLoadingOfSpuTable: false,
      shopTableChart: {},
      paramOfBrandTable: {},
      tableSpu: [],
      spuPage: 1,
      spuTotal: 0,
      pageSize: 10
    }
  },
  computed: {
    hasBrandFormParam () {
      return Object.keys(this.brandList).length !== 0
    },
    ...mapState('brand', ['brandList', 'categoryId'])
  },
  methods: {
    ...mapMutations('brand',
      [
        'RESET_BRAND_CATEGORY',
        'RESET_BRAND_BRANDS',
        'SET_BRAND_BRANDS',
        'SET_BRAND_CATEGORY',
        'SET_BRAND_SETTING'
      ]),
    // 切换tab
    handleTabClick () {
      this.getChartForBrand()
      this.getChartForShop()
      this.getTableForBrand()
      this.getTableForShop()
      this.getTableForSpu()
    },
    // 配置筛选 搜索
    handleSettingParam () {
      this.activeBrand = this.brandList[0]
      this.getChartForBrand()
      this.getChartForShop()
      this.getTableForBrand()
      this.getTableForShop()
      this.getTableForSpu()
    },
    // 切换范围
    handleRangeClick (data) {
      this.rangeItemVal = data.value
      this.getMonthOption().then(() => {
        this.getChartForBrand()
        this.getChartForShop()
        this.getTableForBrand()
        this.getTableForShop()
        this.getTableForSpu()
      })
    },
    // 切换颗粒度
    handleGroupClick (data) {
      this.groupItemVal = data.value
      this.getMonthOption().then((res) => {
        this.getChartForBrand()
        this.getChartForShop()
        this.getTableForBrand()
        this.getTableForShop()
        this.getTableForSpu()
      })
    },
    // 切换 销量 或者 销售额
    handleEchartsClick (data) {
      this.viewItemVal = data.value
      this.getChartForBrand()
    },
    // 按品牌查看店铺列表
    changeActiveBrand (data) {
      this.activeBrand = data
      this.getTableForShop()
      this.getTableForBrand()
      this.getTableForSpu()
    },
    // table 切换month
    handleTableMonth (val) {
      this.tableMonth = val
      this.getTableForShop()
      this.getTableForSpu()
    },
    // 列表排序
    changeSortItemVal (val) {
      this.sortItemVal = val
      this.getTableForShop()
      this.getTableForBrand()
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
    async getChartForBrand () {
      if (!this.activeBrand.brandId || this.activeName !== 'brand') return ''
      const param = {
        id: this.categoryId,
        group: this.groupItemVal,
        view: this.viewItemVal,
        range: this.rangeItemVal,
        brandList: this.brandList,
        tmallMonthList: this.tableMonth
      }
      const loadingInstance = refLoading(this.$refs.brandEchart)
      const res = await getChartForBrand(param)
      loadingInstance.close()
      if (res.code === 200) {
        this.brandChart = res.result
      } else {
        this.$message.error('品牌趋势图请求失败')
      }
    },
    // spu 列表翻页
    changeSpuPage (page) {
      this.spuPage = page
      this.getTableForSpu()
    },
    // 品牌 table
    async getTableForBrand () {
      if (!this.activeBrand.brandId || this.activeName !== 'brand') return ''
      const param = {
        range: this.rangeItemVal,
        group: this.groupItemVal,
        sort: this.sortItemVal,
        id: this.categoryId,
        brandList: [this.activeBrand],
        tmallMonthList: this.tableMonth
      }
      this.paramOfBrandTable = param
      this.isLoadingOfBrandTable = true
      this.brandTableData = []
      const res = await getTableForBrand(param)
      this.isLoadingOfBrandTable = false
      if (res.code === 200) {
        this.brandTableData = res.result
      } else {
        this.$message.error('品牌概览列表请求失败')
        this.brandTableData = []
      }
    },
    // 店铺 chart
    async getChartForShop () {
      if (!this.activeBrand.brandId || this.activeName !== 'shop') return ''
      const param = {
        group: this.groupItemVal,
        view: this.viewItemVal,
        brandList: this.brandList,
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
        this.shopTableData = []
      }
    },
    // spu table
    async getTableForSpu () {
      if (!this.activeBrand.brandId || this.activeName !== 'spu') return ''
      const param = {
        range: this.rangeItemVal,
        id: this.categoryId,
        group: this.groupItemVal,
        sort: this.sortItemVal,
        brandList: [this.activeBrand],
        tmallMonthList: this.tableMonth,
        page: this.spuPage,
        pageSize: this.pageSize
      }
      this.isLoadingOfSpuTable = true
      const res = await getTableForBrandSpu(param)
      this.isLoadingOfSpuTable = false
      if (res.code === 200) {
        this.tableSpu = res.result
        this.spuTotal = res.total
      } else {
        this.$message.error('店铺SPU列表请求失败')
        this.tableSpu = []
        this.spuTotal = 0
      }
    },
    // 如果路由携带参数,则立刻请求行业数据
    handleRoute () {
      const { query } = this.$route
      if (Object.keys(query).length !== 0) {
        this.SET_BRAND_SETTING({
          id: query.id,
          brandList: JSON.parse(query.brandList)
        })
      }
    }
  },
  mounted () {
    this.getMonthOption().then(() => {
      this.handleRoute()
      this.getTableForSpu()
    })
  },
  beforeDestroy () {
    this.RESET_BRAND_BRANDS()
    this.RESET_BRAND_CATEGORY()
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
