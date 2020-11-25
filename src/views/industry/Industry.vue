<template>
    <div>
      <Industry-Setting
        :defaultObj="defaultIndustry"
        @handleFilter="drawerShow = $event"
        @industryNodeClick="brandOnSubmit"
        @handleExport="handleExport"
        @handleExportDialog="dialogVisible = true"/>

      <Empty-Line />

      <div class="industry-tab-wapper">
          <el-tabs v-model="activeName" style='width:100%' @tab-click="handleTabClick">

              <el-tab-pane label="行业概览" name="industry">
                  <Title title="总销售趋势"/>
                  <div ref="refIndustryEchart">
                    <Chart-For-Industry
                      style="width: 100%; height: 280px"
                      :industryEchart="industryEchart"/>
                  </div>
                  <div class="table-title-wapper">
                    <Title title="按子品类展开"/>
                    <Month-Options
                      :monthOption="monthOption"
                      :selectdMonth="selectdMonth"
                      @handleSelectdMonth="handleSelectdMonth"/>
                  </div>
                  <Table-For-Industry
                    :tableData="industryTableData"
                    :isLoading="isLoadingIndustryTable"
                    :activedSortKey="sortItemVal"
                    @handleCate="brandOnSubmit"
                    @changeSortItemVal="changeSortItemVal"/>
              </el-tab-pane>

              <el-tab-pane label="品牌排行" name="brand">
                  <Title title="总销售趋势"/>
                  <div style="display: flex; justify-content: space-between;">
                    <Echarts-Buttons
                      :activeVal="viewItemVal"
                      style="width: 100%"
                      @handleEchartsClick="handleEchartsClick"/>
                    <Month-Options
                      :monthOption="monthOption"
                      :selectdMonth="chartSelectMonth"
                      @handleSelectdMonth="handleChartSelectdMonth"/>
                  </div>
                  <div ref="refBrandChart">
                    <Chart-For-Brand
                      :viewItemVal="viewItemVal"
                      style="width: 100%; height: 300px"
                      :brandEchart="brandEchart"/>
                  </div>
                  <div class="table-title-wapper">
                    <Title title="按品牌展开"/>
                    <Month-Options
                      :monthOption="monthOption"
                      :selectdMonth="selectdMonth"
                      @handleSelectdMonth="handleSelectdMonth"/>
                  </div>
                  <Table-For-Brand
                    :tableData="brandTableData"
                    :isLoading="isLoadingBrandTable"
                    :activedSortKey="sortItemVal"
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
              </el-tab-pane>
          </el-tabs>
          <!-- tab buttons -->
          <Range-Buttons
            :activeVal="rangeItemVal"
            @handleRangeClick="handleRangeClick"
            style='position: absolute; right:380px; top:16px;'/>
          <Group-Buttons
            :activeVal="groupItemVal"
            @handleGroupClick="handleGroupClick"
            style='position: absolute; right:26px; top:16px;'/>
      </div>
      <!-- 抽屉 -->
      <Drawer v-permission :visible="drawerShow" ref="industryDrawer" class="industry-drawer" @handleDrawerClose="handleDrawerClose">
          <Drawer-Button
            slot="button"
            :drawerShow="drawerShow"
            @handleDrawerBtn="handleDrawerBtn"/>
          <Drawer-Content
            :drawerShow="drawerShow"
            @handleDefineSearch="handleDefineSearch"/>
      </Drawer>
      <Download-Button
        v-if="showDownloadBtn"
        v-permission
        :loadingProgress="loadingProgress"/>
      <!-- 行业提数 -->
      <Dialog-For-Industry-Export
        v-if="dialogVisible"
        :dialogVisible="dialogVisible"
        @handleExportExcel="handleExportExcel"
        @closeDialog="dialogVisible = $event"/>
    </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  getIndustryFlatList,
  getMonthOption,
  getIndustryEchart,
  getIndustryBrandTable,
  getBrandChart
} from '@/api/industry'
import { refLoading } from '@/utils/element.js'
import componentsMixin from '@/views/industry/components.js'
import downloadMixim from '@/utils/mixin/downloadCallback.js'
import { INDUSTRY_DEFAULT_INDUSTRY } from '@/utils/const.js'
import permission from '@/utils/directives/permission.js' // 权限判断指令
import { downloadFile } from '@/utils/common.js'

export default {
  name: 'Industry',
  mixins: [componentsMixin, downloadMixim],
  directives: { permission },
  data () {
    return {
      activeName: 'industry',
      rangeItemVal: 'one_year',
      groupItemVal: 'month',
      viewItemVal: 'gmv',
      sortItemVal: 'gmv',
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
      pageSize: 10,
      brandCount: 0,
      dialogVisible: false,
      defineVisible: false,
      loadingProgress: 0,
      iconName: 'el-icon-download',
      meritcoTree: [],
      // total下载进度
      showDownloadBtn: false,
      defaultIndustry: INDUSTRY_DEFAULT_INDUSTRY,
      defineItemId: ''
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
      this.brandTableData = []
      this.getIndustryFlatList()
      this.getIndustryEchart()
      this.getBrandList()
      this.getBrandEchart()
    },
    // 切换范围
    handleRangeClick (rangeItem) {
      if (rangeItem.value === 'one_year') {
        this.groupItemVal = 'month'
      }
      this.rangeItemVal = rangeItem.value
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
    handleGroupClick (groupItem) {
      // 按季度、按半年、按年默认切换“全部”
      if (groupItem.value !== 'month') {
        this.rangeItemVal = 'all'
      }
      this.groupItemVal = groupItem.value
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
      this.page = 1
      this.sortItemVal = 'gmv'
      this.getIndustryEchart()
      this.getIndustryFlatList()
      this.getBrandList()
      this.getBrandEchart()
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
      this.getBrandEchart()
    },
    // 提数接口
    handleExportExcel (formParam) {
      const option = {
        param: formParam,
        url: process.env.VUE_APP_API_URL + '/download/file',
        filename: `Tmall_${formParam.cateName}_${this.$moment(new Date()).format('YYYYMMDD')}`,
        onprogress: this.onprogress,
        onreadystatechange: this.onreadystatechange
      }
      this.showDownloadBtn = true
      downloadFile(option)
    },
    // 修改monthOption
    handleSelectdMonth (val) {
      this.selectdMonth = val
      this.page = 1
      this.getIndustryFlatList()
      this.getBrandList()
    },
    // 品牌堆积图修改montth
    handleChartSelectdMonth (val) {
      this.chartSelectMonth = val
      this.getBrandEchart()
    },
    // table 排序
    changeSortItemVal (val) {
      this.sortItemVal = val
      this.page = 1
      this.getIndustryFlatList()
      this.getBrandList()
    },
    // 品牌tab table 翻页
    changeBrandPage (page) {
      this.page = page
      this.getBrandList()
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
      if (!this.categoryObj.label || this.activeName !== 'brand') return ''
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
    // 品牌tab table
    async getBrandList () {
      if (!this.categoryObj.label || this.activeName !== 'brand') return ''
      const param = {
        cateList: this.categoryObj.rank === 0 ? null : [this.categoryForm],
        defineId: this.categoryObj.rank === 0 ? this.defineItemId : null,
        range: this.rangeItemVal,
        particle: this.groupItemVal,
        month: this.selectdMonth,
        sort: this.sortItemVal,
        page: this.page,
        pageSize: this.pageSize
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
    },
    // 行业提数回调
    handleExport () {
      this.$router.push({
        path: '/file',
        query: {
          cateList: JSON.stringify(this.categoryObj),
          brandList: null,
          activeTab: 'industry'
        }
      })
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
@import './index.styl'
</style>
