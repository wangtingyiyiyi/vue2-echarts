<template>
  <div>
    <Industry-Setting
      :defaultObj="defaultIndustry"
      @handleFilter="drawerShow = $event"
      @industryNodeClick="brandOnSubmit"/>

    <Empty-Line />
    <div class="industry-tab-wapper">
      <!-- <el-tabs v-model="activeName" style='width:100%' @tab-click="handleTabClick"> -->
        <div class="tab-top-title">
            行业概览
            <Button-Group
        size="tiny"
        style='position: absolute; right:480px; top:16px;'
        :options="RANGE_LEVEL"
        :activeVal="rangeItemVal"
        @handleClick="handleRangeClick">
        <div class="filter-label" slot="label">时间维度</div>
      </Button-Group>
      <Button-Group
        size="tiny"
        style='position: absolute; right:126px; top:16px;'
        :options="GROUP_LEVEL"
        :activeVal="groupItemVal"
        @handleClick="handleGroupClick">
        <div class="filter-label" slot="label">时间粒度</div>
      </Button-Group>
      <Month-Options
      style='position: absolute; right:26px;'
                :monthOption="monthOption"
                :selectdMonth="selectdMonth"
                @handleSelectdMonth="handleSelectdMonth"/>
          </div>
        <Empty-Line style="width: 100%; height: 1px; z-index: 8; position: sticky; top: 116px; background-color: #EBEEF5"/>
        <div class="tab-top-content">
            <Title title="总销售趋势"/>
            <div ref="refIndustryEchart">
              <Chart-For-Industry
                style="width: 100%; height: 280px"
                :industryEchart="industryEchart"/>
            </div>
            <div class="table-title-wapper">
              <Title title="按子品类展开"/>
              <!-- <Month-Options
                :monthOption="monthOption"
                :selectdMonth="selectdMonth"
                @handleSelectdMonth="handleSelectdMonth"/> -->
            </div>
            <Table-For-Industry
              :tableData="industryTableData"
              :isLoading="isLoadingIndustryTable"
              :activedSortKey="sortItemVal"
              @handleCate="brandOnSubmit"
              @changeSortItemVal="changeSortItemVal"/>
        </div>
        <Empty-Line style="background-color: #f8f8f8" />
        <div class="tab-top-title" style="width: 80px;">
            品牌排行
        </div>
        <Empty-Line style="width: 100%; height: 1px; z-index: 8; position: sticky; top: 116px; background-color: #EBEEF5"/>
        <div class="tab-top-content">
            <Title title="总销售趋势"/>
            <div style="display: flex; justify-content: space-between;">
              <Echarts-Buttons
                :activeVal="viewItemVal"
                style=""
                @handleEchartsClick="handleEchartsClick"/>
              <!-- <Month-Options
                :monthOption="monthOption"
                :selectdMonth="chartSelectMonth"
                @handleSelectdMonth="handleChartSelectdMonth"/> -->
            </div>
            <div ref="refBrandChart">
              <Chart-For-Brand
                :viewItemVal="viewItemVal"
                style="width: 100%; height: 300px"
                :brandEchart="brandEchart"/>
            </div>
            <div class="table-title-wapper">
              <Title title="按品牌展开"/>
              <!-- <Month-Options
                :monthOption="monthOption"
                :selectdMonth="selectdMonth"
                @handleSelectdMonth="handleSelectdMonth"/> -->
            </div>
            <Table-For-Brand
              :tableData="brandTableData"
              :isLoading="isLoadingBrandTable"
              :activedSortKey="sortItemVal"
              @changeGmvFilter="changeGmvFilter"
              @changeSortItemVal="changeSortItemVal"/>
            <el-pagination
              v-show="brandCount !== 0"
              background
              layout="prev, pager, next"
              class="pagination-wapper"
              @current-change="changeBrandPage"
              :current-page="page"
              :page-size="pageSize"
              :total="brandCount">
            </el-pagination>
        </div>
        <Empty-Line style="background-color: #f8f8f8" />
        <div class="tab-top-title" style="width: 80px;">
             SPU
        </div>
        <Empty-Line style="width: 100%; height: 1px; z-index: 8; position: sticky; top: 116px; background-color: #EBEEF5"/>
        <div class="tab-top-content">
            <Table-For-Spu
              :isLoading="isLoadingOfSpuTable"
              :activedSortKey="sortItemVal"
              @changeSortItemVal="changeSortItemVal"
              :tableData="tableSpu"/>
            <el-pagination
              v-show="spuTotal !== 0"
              background
              layout="prev, pager, next"
              class="pagination-wapper"
              :current-page="spuPage"
              :page-size="pageSize"
              :total="spuTotal"
              @current-change="changeSpuPage">
            </el-pagination>
        </div>
      <!-- </el-tabs> -->
    </div>
    <!-- 抽屉 -->
    <Drawer
      v-permission
      :visible="drawerShow"
      ref="industryDrawer"
      class="industry-drawer"
      @handleDrawerClose="handleDrawerClose">
      <Drawer-Button
        slot="button"
        :drawerShow="drawerShow"
        @handleDrawerBtn="handleDrawerBtn"/>
      <Drawer-Content
        :drawerShow="drawerShow"
        @handleDefineSearch="handleDefineSearch"/>
    </Drawer>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  getIndustryFlatList,
  getMonthOption,
  getIndustryEchart,
  getTableForIndustrySpu,
  getIndustryBrandTable,
  getBrandChart
} from '@/api/industry'
import { refLoading } from '@/utils/element.js'
import componentsMixin from '@/views/industry/components.js'
import { INDUSTRY_DEFAULT_INDUSTRY, GROUP_LEVEL, RANGE_LEVEL } from '@/utils/const.js'
import permission from '@/utils/directives/permission.js' // 权限判断指令

export default {
  name: 'Industry',
  mixins: [componentsMixin],
  directives: { permission },
  data () {
    return {
      optionValue: '',
      activeName: 'industry',
      rangeItemVal: 'one_year',
      groupItemVal: 'month',
      viewItemVal: 'gmv',
      sortItemVal: 'gmv',
      isLoadingOfSpuTable: false,
      tableSpu: [],
      gmvStart: null,
      gmvEnd: null,
      drawerShow: false,
      categoryForm: {},
      monthOption: [],
      selectdMonth: '',
      chartSelectMonth: '',
      industryEchart: {},
      industryTableData: [],
      isLoadingIndustryTable: false,
      brandEchart: {
        gmvList: [],
        percentList: [],
        xlist: []
      },
      brandTableData: [],
      isLoadingBrandTable: false,
      page: 1,
      pageSize: 20,
      spuPage: 1,
      spuTotal: 0,
      brandCount: 0,
      dialogVisible: false,
      defineVisible: false,
      iconName: 'el-icon-download',
      meritcoTree: [],
      defaultIndustry: INDUSTRY_DEFAULT_INDUSTRY,
      defineItemId: '',
      GROUP_LEVEL,
      RANGE_LEVEL
    }
  },
  computed: {
    ...mapState('industry', ['categoryObj']),
    ...mapState('user', ['type'])
  },
  methods: {
    ...mapMutations('industry', [
      'SET_INDUSTRY_CATRGOTY_TABLE_PARAM',
      'RESET_INDUSTRY_CATRGOTY_TABLE_PARAM',
      'SET_INDUSTRY_CATEGORY',
      'RESET_INDUSTRY_CATEGORY']),
    // 切换tab
    handleTabClick (tab) {
      this.page = 1
      this.sortItemVal = 'gmv'
      this.brandCount = 0
      this.getIndustryFlatList()
      this.getIndustryEchart()
      this.getBrandList()
      this.getBrandEchart()
    },
    // 切换范围
    handleRangeClick (k, value) {
      if (value === 'one_year') {
        this.groupItemVal = 'month'
      }
      this.rangeItemVal = value
      this.selectdMonth = ''
      this.chartSelectMonth = ''
      this.page = 1
      this.getIndustryEchart()
      this.getIndustryFlatList()
      this.getBrandList()
      this.getBrandEchart()
      this.getMonthOption()
    },
    // 切换颗粒度
    handleGroupClick (k, value) {
      // 按季度、按半年、按年默认切换“全部”
      if (value !== 'month') {
        this.rangeItemVal = 'all'
      }
      this.groupItemVal = value
      this.page = 1
      this.selectdMonth = ''
      this.chartSelectMonth = ''
      this.getIndustryEchart()
      this.getIndustryFlatList()
      this.getBrandList()
      this.getBrandEchart()
      this.getMonthOption()
    },
    // 销量 和 销售额切换
    handleEchartsClick (item) {
      this.viewItemVal = item.value
      this.getBrandEchart()
    },
    // 高级搜索 弹出抽屉
    handleDrawerBtn () {
      this.drawerShow = !this.drawerShow
    },
    // 抽屉关闭
    handleDrawerClose (value) {
      this.drawerShow = value
    },
    // 搜索
    brandOnSubmit (data) {
      this.categoryForm = { ...this.categoryObj }
      this.defineItemId = this.categoryForm.defineId
      this.page = 1
      this.sortItemVal = 'gmv'
      this.getIndustryEchart()
      this.getIndustryFlatList()
      this.getBrandList()
      this.getBrandEchart()
      this.getTableForSpu()
    },
    // setting 选择行业 待参数刷新
    industryNodeClick (data) {
      this.$router.push({
        path: '/industry',
        query: data
      })
      this.handleRoute()
    },
    // 抽屉中，自定义行业查询
    handleDefineSearch (param) {
      this.handleDrawerClose(false)
      this.defaultIndustry = {
        rank: param.rank,
        label: param.label
      }
      this.SET_INDUSTRY_CATEGORY(this.defaultIndustry)
      this.defineItemId = param.id
      this.page = 1
      this.getIndustryEchart()
      this.getIndustryFlatList()
      this.getBrandList()
      this.getTableForSpu()
      this.getBrandEchart()
    },
    // 修改monthOption
    handleSelectdMonth (val) {
      this.selectdMonth = val
      this.page = 1
      this.chartSelectMonth = val
      this.getBrandEchart()
      this.getIndustryFlatList()
      this.getBrandList()
      this.getTableForSpu()
    },
    // 品牌堆积图修改montth
    // handleChartSelectdMonth (val) {
    //   this.chartSelectMonth = val
    //   this.getBrandEchart()
    // },
    // table 排序
    changeSortItemVal (val) {
      this.sortItemVal = val
      this.page = 1
      this.getIndustryFlatList()
      this.getBrandList()
      this.getTableForSpu()
    },
    changeGmvFilter (form) {
      console.info(form)
      this.gmvEnd = form.gmvEnd
      this.gmvStart = form.gmvStart
      this.page = 1
      this.getBrandList()
      this.getTableForSpu()
    },
    // 品牌tab table 翻页
    changeBrandPage (page) {
      this.page = page
      this.getBrandList()
    },
    async getTableForSpu () {
      // if (!this.activeBrand || this.activeName !== 'spu') return ''
      const param = {
        cateList: this.categoryObj.rank === 0 ? null : [this.categoryForm],
        // defineId: this.categoryObj.rank === 0 ? this.defineItemId : null,
        particle: this.groupItemVal,
        month: this.selectdMonth,
        sort: this.sortItemVal,
        page: this.spuPage,
        pageSize: this.pageSize
      }
      this.isLoadingOfSpuTable = true
      const res = await getTableForIndustrySpu(param)
      this.isLoadingOfSpuTable = false
      if (res.code === 200) {
        this.tableSpu = res.result
        this.spuTotal = res.count
      } else {
        this.$message.error('店铺SPU列表请求失败')
        this.tableSpu = []
        this.spuTotal = 0
      }
    },
    // 行业tab table
    async getIndustryFlatList () {
      if (this.activeName !== 'industry') return ''
      this.industryTableData = []
      const param = {
        cateList: this.categoryObj.rank === 0 ? null : [this.categoryForm],
        defineId: this.categoryObj.rank === 0 ? this.defineItemId : null,
        range: this.rangeItemVal,
        particle: this.groupItemVal,
        month: this.selectdMonth,
        sort: this.sortItemVal
      }
      this.SET_INDUSTRY_CATRGOTY_TABLE_PARAM(param)
      this.isLoadingIndustryTable = true
      const res = await getIndustryFlatList(param)
      this.isLoadingIndustryTable = false
      if (res.code === 200) {
        this.industryTableData = res.result
      } else {
        this.$message.error('行业子品类table数据请求失败')
        this.industryTableData = []
      }
    },
    // 行业tab 图表
    async getIndustryEchart () {
      if (this.activeName !== 'industry') return ''
      const param = {
        cateList: this.categoryObj.rank === 0 ? null : [this.categoryForm],
        defineId: this.categoryObj.rank === 0 ? this.defineItemId : null,
        range: this.rangeItemVal,
        particle: this.groupItemVal,
        data: this.viewItemVal,
        month: this.selectdMonth
      }
      const loadingInstance = refLoading(this.$refs.refIndustryEchart)
      const res = await getIndustryEchart(param)
      loadingInstance.close()
      if (res.code === 200) {
        this.industryEchart = res.result
      } else {
        this.$message.error('行业概览总销售趋势图请求失败')
      }
    },
    // 品牌tab 图表
    async getBrandEchart () {
      // if (!this.categoryObj.label || this.activeName !== 'brand') return ''
      const param = {
        cateList: this.categoryObj.rank === 0 ? null : [this.categoryForm],
        defineId: this.categoryObj.rank === 0 ? this.defineItemId : null,
        range: this.rangeItemVal,
        particle: this.groupItemVal,
        data: this.viewItemVal,
        month: this.chartSelectMonth
      }
      const loadingInstance = refLoading(this.$refs.refBrandChart)
      const res = await getBrandChart(param)
      loadingInstance.close()
      if (res.code === 200) {
        this.brandEchart = res.result
      } else {
        this.$message.error('品牌趋势图表请求失败')
      }
    },
    // spu 列表翻页
    changeSpuPage (page) {
      this.spuPage = page
      this.getTableForSpu()
    },
    // 品牌tab table
    async getBrandList () {
      // if (!this.categoryObj.label || this.activeName !== 'brand') return ''
      const param = {
        cateList: this.categoryObj.rank === 0 ? null : [this.categoryForm],
        defineId: this.categoryObj.rank === 0 ? this.defineItemId : null,
        range: this.rangeItemVal,
        particle: this.groupItemVal,
        month: this.selectdMonth,
        sort: this.sortItemVal,
        page: this.page,
        pageSize: this.pageSize,
        gmvEnd: this.gmvEnd,
        gmvStart: this.gmvStart
      }
      this.isLoadingBrandTable = true
      const res = await getIndustryBrandTable(param)
      this.isLoadingBrandTable = false
      if (res.code === 200) {
        this.brandCount = res.count
        this.brandTableData = res.result
      } else {
        this.$message.error('行业品牌列表请求失败')
        this.brandCount = 0
        this.brandTableData = []
      }
    },
    // 行业初始化时 monthOption
    async getMonthOption () {
      const res = await getMonthOption({ range: this.rangeItemVal, particle: this.groupItemVal })
      if (res.code === 200) {
        this.monthOption = res.result
        this.selectdMonth = this.monthOption[0]
        this.chartSelectMonth = this.monthOption[0]
      } else {
        this.$message.error('行业分类月份列表请求失败')
      }
    },
    // 如果路由携带参数,则立刻请求行业数据
    handleRoute () {
      const { query } = this.$route
      if (Object.keys(query).length !== 0) {
        this.defaultIndustry = JSON.parse(query.cateList)
        this.SET_INDUSTRY_CATEGORY(this.defaultIndustry)
        this.brandOnSubmit()
      } else {
        this.SET_INDUSTRY_CATEGORY(this.defaultIndustry)
        this.brandOnSubmit()
      }
    }
  },
  mounted () {
    this.handleRoute()
    this.getMonthOption()
  },
  beforeDestroy () {
    this.RESET_INDUSTRY_CATEGORY()
    this.RESET_INDUSTRY_CATRGOTY_TABLE_PARAM()
  }
}
</script>

<style lang="stylus" scoped>
html,body {
  height: 100%;
}
.industry-tab-wapper
  background-color #ffffff
  position relative
  min-height calc(100% - 131px)

.right-tab
  position absolute
  right 0

.industry-drawer
  height 100vh
  position fixed
  right 0
  top 0
  z-index 2000

.table-title-wapper
  display flex
  align-items baseline
  justify-content space-between
  margin-bottom 5px
  margin-top 14px

.flex-between
  display flex
  align-items baseline
  justify-content: space-between

.pagination-wapper
  text-align center
  margin 15px 0
  >>> .el-pager li:not(.disabled).active
    background-color: #5b8ff9;

.industry-tab-wapper >>> .el-tabs .el-tabs__content
  min-height calc(100vh - 403px)
  overflow: inherit;

.tab-top-title
  background-color white
  z-index 9
  position sticky
  top 20px
  padding-left 25px !important
  font-size 16px
  line-height 56px
  height 56px
  // border-bottom 1px solid #EBEEF5

.tab-top-content
  padding 25px

// .sup-mini-select
//   width 100px
//   height 22px
//   >>> .el-input
//     height 22px
//     .el-input__inner
//       height 22px
//       font-size 14px
//     .el-input__icon
//       height 19px
//       line-height 19px
.tab-top-content /deep/ .el-table .tableHeaderClass th {
    background-color: #fbfbfb !important;
}
</style>
