<template>
  <div>
        <Brand-Setting
          @handleSetBrands="handleSetBrands"
          @handleSetCategroy="handleSetCategroy"
          @handleExportDialog="handleExportDialog"/>

        <Empty-Line />

        <div class="brand-tab-wapper">
          <el-tabs v-model="activeName" style='width:100%' @tab-click="handleTabClick">
              <el-tab-pane label="品牌概览" name="brand">
                  <div v-show="showEmpty">
                    <Title class="m-b-12" title="总销售趋势"/>
                    <Empty-Icon />
                    <Title title="按品牌展开"/>
                    <Empty-Icon />
                  </div>

                  <div v-show="!showEmpty">
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

                    <div class="table-title-wapper m-b-12">
                      <Title title="按品牌展开"/>
                      <Month-Options
                        :monthOption="monthOption"
                        :selectdMonth="selectdMonth"
                        @handleSelectdMonth="handleMonth"/>
                    </div>

                    <Brand-Table-Brands
                      :brands="brandList"
                      :activeBrand="activeBrand"
                      class="m-b-10"
                      @changeActiveBrand="changeActiveBrand"/>

                    <Table-For-Brand
                      ref="table"
                      :activedSortKey="sortItemVal"
                      :tableData="brandTableData"
                      :isLoading="isLoadingOfBrandTable"
                      :paramOfBrandTable="paramOfBrandTable"
                      @changeSortItemVal="changeSortItemVal"/>
                  </div>
              </el-tab-pane>
              <el-tab-pane label="SPU" name="spu">
                <Empty-Icon v-show="showEmpty"/>
                <div v-show="!showEmpty">
                  <div class="flex-between m-b-10">
                    <Brand-Table-Brands
                      :brands="brandList"
                      :activeBrand="activeBrand"
                      @changeActiveBrand="changeActiveBrand"/>
                      <Month-Options
                      :monthOption="monthOption"
                      :selectdMonth="selectdMonth"
                      @handleSelectdMonth="handleTableMonth"/>
                  </div>
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
          <div style='position: absolute; right:26px; top:16px;'>
          </div>
        </div>
        <Download-Button
          v-if="showDownloadBtn"
          v-permission
          :loadingProgress="loadingProgress"/>
        <Dialog-For-Brand-Export
          :dialogVisible="exportDialogVisible"
          v-if="exportDialogVisible"
          @handleExportExcel="handleExportExcel"
          @closeDialog="exportDialogVisible = $event"/>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { refLoading } from '@/utils/element.js'
import componentsMixin from '@/views/brand/components.js'
import { BRAND_DEFINE_BRAND } from '@/utils/const.js'
import { downloadFile } from '@/utils/common.js'
import downloadMixim from '@/utils/mixin/downloadCallback.js'

import permission from '@/utils/directives/permission.js' // 权限判断指令

import {
  getTableForBrand,
  getChartForBrand,
  getTableForBrandSpu,
  getCategorytByBrand
} from '@/api/brand'
import {
  getMonthOption
} from '@/api/industry'
export default {
  name: 'Brand',
  directives: { permission },
  mixins: [componentsMixin, downloadMixim],
  data () {
    return {
      activeName: 'brand',
      rangeItemVal: 'one_year',
      groupItemVal: 'month',
      viewItemVal: 'gmv',
      sortItemVal: 'gmv',
      brandList: [],
      cateList: [],
      brandTableData: [],
      shopTableData: [],
      activeBrand: '',
      brandChart: [],
      monthOption: [],
      selectdMonth: '',
      tableMonth: '',
      isLoadingOfShopTable: false,
      isLoadingOfBrandTable: false,
      isLoadingOfSpuTable: false,
      shopTableChart: {},
      paramOfBrandTable: {},
      tableSpu: [],
      spuPage: 1,
      spuTotal: 0,
      pageSize: 10,
      exportDialogVisible: false,
      defaultBrand: BRAND_DEFINE_BRAND,
      loadingProgress: 0,
      showDownloadBtn: false
    }
  },
  computed: {
    showEmpty () {
      return this.brandList.length === 0
    }
  },
  methods: {
    ...mapMutations('brand',
      [
        'RESET_BRAND_CATEGORY',
        'RESET_BRAND_BRANDS',
        'SET_BRAND_BRANDS',
        'SET_BRAND_CATEGORY'
      ]),
    // 切换tab
    handleTabClick () {
      this.sortItemVal = 'gmv'
      this.tableSpu = []
      this.spuTotal = 0
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForSpu()
    },
    handleSetBrands (brands) {
      this.brandList = brands
      this.activeBrand = this.brandList[0] || ''
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForSpu()
    },
    handleSetCategroy (cate) {
      this.cateList = [cate]
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForSpu()
    },
    // 配置筛选 搜索
    handleSettingParam () {
      this.activeBrand = this.brandList[0] || ''
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForSpu()
    },
    // 切换范围
    handleRangeClick (data) {
      // 近一年，默认切换“按月”
      if (data.value === 'one_year') {
        this.groupItemVal = 'month'
      }
      this.rangeItemVal = data.value
      this.selectdMonth = ''
      this.spuPage = 1
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForSpu()
      this.getMonthOption()
    },
    // 切换颗粒度
    handleGroupClick (data) {
      // 按季度、按半年、按年默认切换“全部”
      if (data.value !== 'month') {
        this.rangeItemVal = 'all'
      }
      this.groupItemVal = data.value
      this.selectdMonth = ''
      this.spuPage = 1
      this.getChartForBrand()
      this.getTableForBrand()
      this.getTableForSpu()
      this.getMonthOption()
    },
    // 切换 销量 或者 销售额
    handleEchartsClick (data) {
      this.viewItemVal = data.value
      this.getChartForBrand()
    },
    // 按品牌查看店铺列表
    changeActiveBrand (data) {
      this.activeBrand = data
      this.getTableForBrand()
      this.getTableForSpu()
    },
    // table 切换month
    handleTableMonth (val) {
      this.spuPage = 1
      this.selectdMonth = val
      this.getTableForSpu()
    },
    // 列表排序
    changeSortItemVal (val) {
      this.sortItemVal = val
      this.getTableForBrand()
      this.getTableForSpu()
    },
    // chart 切换month
    handleSelectdMonth (val) {
      this.selectdMonth = val
    },
    handleMonth (val) {
      this.selectdMonth = val
      this.getTableForBrand()
    },
    // 品牌提数弹出框
    handleExportDialog () {
      this.exportDialogVisible = true
    },
    // 品牌提数回调
    handleExportExcel (formParam) {
      const brandName = formParam.brandList.join('&')
      const option = {
        param: formParam,
        url: process.env.VUE_APP_API_URL + '/download/file',
        filename: `Tmall_${formParam.cate}(${brandName})_${this.$moment(new Date()).format('YYYYMMDD')}`,
        onprogress: this.onprogress,
        onreadystatechange: this.onreadystatechange
      }
      this.showDownloadBtn = true
      downloadFile(option)
    },
    // spu 列表翻页
    changeSpuPage (page) {
      this.spuPage = page
      this.getTableForSpu()
    },
    // 获取月份options
    async getMonthOption () {
      const res = await getMonthOption({ range: this.rangeItemVal, particle: this.groupItemVal })
      if (res.code === 200) {
        this.monthOption = res.result
        this.selectdMonth = res.result[0]
      } else {
        this.$message.error('行业分类月份列表请求失败')
      }
    },
    // 品牌 chart
    async getChartForBrand () {
      if (this.activeBrand.length === 0 || this.activeName !== 'brand') return ''
      const param = {
        cateList: this.cateList,
        particle: this.groupItemVal,
        data: this.viewItemVal,
        range: this.rangeItemVal,
        brandList: this.brandList,
        month: this.selectdMonth
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
    // 品牌 table
    async getTableForBrand () {
      if (!this.activeBrand || this.activeName !== 'brand') return ''
      const param = {
        range: this.rangeItemVal,
        particle: this.groupItemVal,
        sort: this.sortItemVal,
        cateList: this.cateList,
        brandList: [this.activeBrand],
        month: this.selectdMonth
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
    // spu table
    async getTableForSpu () {
      if (!this.activeBrand || this.activeName !== 'spu') return ''
      const param = {
        range: this.rangeItemVal,
        cateList: this.cateList,
        particle: this.groupItemVal,
        sort: this.sortItemVal,
        brandList: [this.activeBrand],
        month: this.selectdMonth,
        page: this.spuPage,
        pageSize: this.pageSize
      }
      this.isLoadingOfSpuTable = true
      const res = await getTableForBrandSpu(param)
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
    async getCategoryByBrands () {
      const res = await getCategorytByBrand({ brandList: this.brandList })
      if (res.code === 200) {
        this.cateList = [Object.assign(res.result[0], { children: null })]
      } else {
        this.$message.error('品牌分类请求失败')
      }
    },
    // 如果路由携带参数,则立刻请求行业数据
    handleRoute () {
      const { query } = this.$route
      if (Object.keys(query).length !== 0) {
        console.info(query)
        this.brandList = [JSON.parse(query.brandList)]
        this.activeBrand = this.brandList[0]
        this.cateList = [JSON.parse(query.cateList)]
        this.getChartForBrand()
        this.getTableForBrand()
        this.getTableForSpu()
      } else {
        this.brandList = this.defaultBrand.brandList
        this.activeBrand = this.brandList[0]
        this.getCategoryByBrands().then(() => {
          this.getChartForBrand()
          this.getTableForBrand()
          this.getTableForSpu()
        })
      }
    }
  },
  mounted () {
    this.handleRoute()
    this.getMonthOption()
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
