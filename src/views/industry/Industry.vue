<template>
  <div>
    <Industry-Setting
      @handleFilter="drawerShow = $event"
      @brandOnSubmit="brandOnSubmit"
      @handleExportDialog="handleExportDialog"/>
    <Empty-Line />
    <div class="industry-tab-wapper">
        <el-tabs v-model="activeName" style='width:100%' @tab-click="handleTabClick">

            <el-tab-pane label="行业概览" name="industry">
              <div v-show="hasCategory">
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
                  @handleIndustrySort="handleIndustrySort"/>
              </div>

              <div v-show="!hasCategory">
                <div class="empty-info">请选择行业</div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="品牌排行" name="brand">
              <div v-show="hasCategory">
                <Title title="总销售趋势"/>
                <Echarts-Buttons
                  :activeVal="viewItemVal"
                  style="width: 100%"
                  class="m-b-5"
                  @handleEchartsClick="handleEchartsClick"/>
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
                  @handleBrandSort="handleBrandSort"/>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  class="pagination-wapper"
                  @current-change="changeBrandPage"
                  :current-page="page"
                  :page-size="pageSize"
                  :total="brandCount">
                </el-pagination>
              </div>

              <div v-show="!hasCategory">
                <div class="empty-info">请选择行业</div>
              </div>
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
    <Drawer :visible="drawerShow" ref="industryDrawer" class="industry-drawer" @handleDrawerClose="handleDrawerClose">
        <Drawer-Button
          slot="button"
          :drawerShow="drawerShow"
          @handleDrawerBtn="handleDrawerBtn"/>
        <Drawer-Content
          :drawerShow="drawerShow"/>
    </Drawer>
    <Download-Button :loadingProgress="loadingProgress" :iconName="iconName"/>
    <!-- 行业提数 -->
    <Dialog-For-Industry-Export
      :dialogVisible="dialogVisible"
      v-if="dialogVisible"
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
import { blolToFile } from '@/utils/common.js'
export default {
  mixins: [componentsMixin],
  data () {
    return {
      activeName: 'industry',
      rangeItemVal: '1',
      groupItemVal: '0',
      viewItemVal: '1',
      sortItemVal: '1',
      drawerShow: false,
      categoryForm: {},
      monthOption: [],
      selectdMonth: {},
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
      meritcoTree: []
    }
  },
  computed: {
    ...mapState('industry', ['categoryObj']),
    hasCategory: function () {
      return Object.keys(this.categoryForm).length !== 0
    }
  },
  methods: {
    ...mapMutations('industry', [
      'SET_INDUSTRY_CATRGOTY_TABLE_PARAM',
      'RESET_INDUSTRY_CATRGOTY_TABLE_PARAM',
      'SET_INDUSTRY_CATEGORY',
      'RESET_INDUSTRY_CATEGORY']),
    handleDefineDialog (val) {
      console.info(val)
    },
    // 切换tab
    handleTabClick (tab) {
      this.page = 1
      this.sortItemVal = '1'
      this.getIndustryFlatList()
      this.getIndustryEchart()
      this.getBrandList()
      this.getBrandEchart()
    },
    // 切换范围
    handleRangeClick (rangeItem) {
      this.rangeItemVal = rangeItem.value
      this.page = 1
      this.getIndustryEchart()
      this.getMonthOption().then(() => {
        this.getIndustryFlatList()
        this.getBrandList()
        this.getBrandEchart()
      })
    },
    // 切换颗粒度
    handleGroupClick (groupItem) {
      this.groupItemVal = groupItem.value
      this.page = 1
      this.getIndustryEchart()
      this.getMonthOption()
        .then(() => {
          this.getIndustryFlatList()
          this.getBrandList()
          this.getBrandEchart()
        })
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
      this.getIndustryEchart()
      this.getIndustryFlatList()
      this.getBrandList()
      this.getBrandEchart()
    },
    // 行业提数 弹出框
    handleExportDialog () {
      this.dialogVisible = true
    },
    handleExportExcel (param) {
      this.iconName = 'el-icon-loading'
      const that = this
      const filename = 'Tmall_' + param.cateName + '_' + this.$moment(new Date()).format('YYYYMMDD')
      const url = `${process.env.VUE_APP_API_URL}/userInfo/download`
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.responseType = 'blob'
      xhr.setRequestHeader('Content-Type', ' application/json')
      xhr.setRequestHeader('token', sessionStorage.getItem('token'))
      xhr.onprogress = function (event) {
        that.iconName = 'el-icon-download'
        const p = event.loaded / event.total
        that.loadingProgress = p
        if (event.loaded === event.total) {
          that.$message.success('下载完成')
        }
      }
      xhr.onload = function (params) {
        console.info(this)
        if (this.status >= 200 && this.status < 300) {
          const blob = new Blob([this.response], { type: 'application/excel' })
          blolToFile(blob, filename)
        }
      }
      xhr.send(JSON.stringify(param))
    },
    // 修改monthOption
    handleSelectdMonth (val) {
      this.selectdMonth = val
      this.page = 1
      this.getIndustryFlatList()
      this.getBrandList()
    },
    // 行业tab 图表
    async getIndustryEchart () {
      if (!this.categoryObj.id || this.activeName !== 'industry') return ''
      const param = Object.assign({ ...this.categoryForm }, { range: this.rangeItemVal, group: this.groupItemVal })
      const loadingInstance = refLoading(this.$refs.refIndustryEchart)
      const res = await getIndustryEchart(param)
      loadingInstance.close()
      if (res.code === 200) {
        this.industryEchart = res.result
      } else {
        this.$message.error('行业概览总销售趋势图请求失败')
      }
    },

    // 行业tab table 排序
    handleIndustrySort (val) {
      this.sortItemVal = val
      this.page = 1
      this.getIndustryFlatList()
    },
    // 品牌tab table 翻页
    changeBrandPage (page) {
      this.page = page
      this.getBrandList()
    },
    // tab 品牌排序
    handleBrandSort (val) {
      this.sortItemVal = val
      this.page = 1
      this.getBrandList()
    },
    // 行业tab table
    async getIndustryFlatList () {
      if (!this.categoryObj.id || this.activeName !== 'industry') return ''
      this.industryTableData = []
      const param = {
        range: this.rangeItemVal,
        group: this.groupItemVal,
        tmallMonthList: this.selectdMonth,
        id: this.categoryForm.id,
        remark: this.categoryForm.remark,
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
    // 品牌tab 图表
    async getBrandEchart () {
      if (!this.categoryObj.id || this.activeName !== 'brand') return ''
      const param = Object.assign({ ...this.categoryForm }, { range: this.rangeItemVal, group: this.groupItemVal, view: this.viewItemVal })
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
      if (!this.categoryObj.id || this.activeName !== 'brand') return ''
      const param = {
        range: this.rangeItemVal,
        group: this.groupItemVal,
        tmallMonthList: this.selectdMonth,
        id: this.categoryForm.id,
        remark: this.categoryForm.remark,
        sort: this.sortItemVal,
        page: this.page,
        pageSize: this.pageSize
      }
      this.isLoadingBrandTable = true
      const res = await getIndustryBrandTable(param)
      this.isLoadingBrandTable = false
      if (res.code === 200) {
        this.brandCount = res.result.brandCount
        this.brandTableData = res.result.detailsBeanList
      } else {
        this.$message.error('行业品牌列表请求失败')
        this.brandCount = 0
        this.brandTableData = []
      }
    },
    // 行业初始化时 monthOption
    async getMonthOption () {
      const res = await getMonthOption({ range: this.rangeItemVal, group: this.groupItemVal })
      if (res.code === 200) {
        this.monthOption = res.result
        this.selectdMonth = this.monthOption[0]
      } else {
        this.$message.error('行业分类月份列表请求失败')
      }
    },
    // 如果路由携带参数,则立刻请求行业数据
    handleRoute () {
      const { query } = this.$route
      if (Object.keys(query).length !== 0) {
        this.SET_INDUSTRY_CATEGORY(query)
        this.brandOnSubmit()
      }
    }
  },
  mounted () {
    this.getMonthOption().then(() => {
      this.handleRoute()
    })
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
