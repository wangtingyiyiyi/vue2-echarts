<template>
  <div>
    <Industry-Setting @handleFilter="drawerShow = $event" @brandOnSubmit="brandOnSubmit"/>
    <Empty-Line />
    <div class="industry-tab-wapper">
        <el-tabs v-model="activeName" style='width:100%'>
            <el-tab-pane label="行业概览" name="industry" lazy>

              <div v-show="hasCategory">
                <Title title="总销售趋势"/>
                <div ref="refIndustryEchart">
                  <Industry-Chart style="width: 100%; height: 500px" :industryEchart="industryEchart"/>
                </div>
                <div class="table-title-wapper">
                  <Title title="按子品类展开"/>
                  <Month-Options
                  :monthOption="monthOption"
                  :selectdMonth="selectdMonth"
                  @handleSelectdMonth="handleSelectdMonth"/>
                </div>
                <Tab-Industry-Table
                  :tableData="industryTableData"
                  :isLoading="isLoadingIndustryTable"
                  :activedSortKey="industrySort"
                  @handleIndustrySort="handleIndustrySort"/>
              </div>

              <div v-show="!hasCategory">
                <Title title="总销售趋势"/>
                <Svg-Icon icon-class="empty" class="empty-svg"/>
                <div style="display: flex; align-items: baseline; justify-content: space-between;">
                  <Title title="按子品类展开"/>
                  <!-- <Month-Options
                    :monthOption="monthOption"
                    :selectdMonth="selectdMonth"
                    @handleSelectdMonth="handleSelectdMonth"/> -->
                </div>
                <Svg-Icon icon-class="empty" class="empty-svg"/>
              </div>
            </el-tab-pane>

            <el-tab-pane label="品牌排行" name="brand" lazy>

              <div v-if="hasCategory">
                <Title title="总销售趋势"/>
                <Echarts-Buttons
                  :activeVal="activeButton"
                  style="width: 100%"
                  @handleEchartsClick="handleEchartsClick"/>
                <Line-And-Bar-Chart />
                <div style="display: flex; align-items: baseline; justify-content: space-between;">
                  <Title title="按品牌展开"/>
                  <Month-Options :monthOption="monthOption"/>
                </div>
                <Tab-Brand-Table :tableData="mockTableData"/>
              </div>

              <div v-else class="empty-wapper">
                <Title title="总销售趋势"/>
                <Svg-Icon icon-class="empty" class="empty-svg" />
                <Title title="按品牌展开"/>
                <Svg-Icon icon-class="empty" class="empty-svg" />
              </div>

            </el-tab-pane>
        </el-tabs>
        <!-- tab buttons -->
        <Range-Buttons
          :activeVal="rangeItemVal"
          @handleRangeClick="handleRangeClick"
          style='position: absolute; right:350px; top:12px;'/>
        <Group-Buttons
          :activeVal="groupItemVal"
          @handleGroupClick="handleGroupClick"
          style='position: absolute; right:10px; top:12px;'/>
    </div>
    <!-- 抽屉 -->
    <Drawer :visible="drawerShow" class="industry-drawer" @handleDrawerClose="handleDrawerClose">
        <!-- 抽屉按钮slot -->
        <IndustryDrawerSlotBtn
          slot="button"
          :drawerShow="drawerShow"
          @handleDrawerBtn="handleDrawerBtn"/>
        <!-- 抽屉内容slot -->
        <Industry-Drawer-Slot :drawerShow="drawerShow"/>
    </Drawer>
  </div>
</template>

<script>
import TabIndustryTable from '@/views/industry/components/TabIndustryTable.vue'
import IndustrySetting from '@/views/industry/components/IndustrySetting.vue'
import IndustryChart from '@/views/industry/components/IndustryChart.vue'
import Drawer from '@/components/Drawer.vue'
import IndustryDrawerSlot from '@/views/industry/components/IndustryDrawerSlot.vue'
import IndustryDrawerSlotBtn from '@/views/industry/components/IndustryDrawerSlotBtn.vue'
import TabBrandTable from '@/views/industry/components/TabBrandTable.vue'
import { mapMutations } from 'vuex'
import { getFlatList, getMonthOption, getIndustryEchart } from '@/api/industry'
import { mockTableData } from '@/mock.js'
import { refLoading } from '@/utils/element.js'

export default {
  components: {
    IndustrySetting,
    Drawer,
    IndustryDrawerSlot,
    IndustryDrawerSlotBtn,
    TabBrandTable,
    TabIndustryTable,
    IndustryChart
  },
  data () {
    return {
      activeButton: 'sumSalescount',
      activeName: 'industry',
      rangeItemVal: '1',
      groupItemVal: '0',
      drawerShow: false,
      categoryForm: {},
      tableData: [],
      mockTableData: mockTableData,
      monthOption: [],
      selectdMonth: {},
      industryEchart: {},
      industryTableData: [],
      isLoadingIndustryTable: false,
      industrySort: '1'
    }
  },
  computed: {
    hasCategory: function () {
      return Object.keys(this.categoryForm).length !== 0
    }
  },
  methods: {
    ...mapMutations('industry', ['SET_INDUSTRY_CATEGORY']),
    // 范围
    handleRangeClick (rangeItem) {
      this.rangeItemVal = rangeItem.value
      this.getIndustryEchart()
      this.getMonthOption()
    },
    // 颗粒度
    handleGroupClick (groupItem) {
      this.groupItemVal = groupItem.value
      this.getIndustryEchart()
      this.getMonthOption()
    },
    // 销量 和 销售额切换
    handleEchartsClick (item) {
      this.activeButton = item.value
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
      this.categoryForm = { ...data }
      // this.getMonthOption()
      if (this.activeName === 'industry') {
        // 请求行业概览接口
        console.info('请求行业概览接口')
        this.getIndustryEchart()
        this.getFlatList()
      } else {
        console.info('请求品类排行接口')
        // 请求品类排行接口
      }
      // this.getTableData()
      this.SET_INDUSTRY_CATEGORY(data)
    },
    // 修改monthOption
    handleSelectdMonth (val) {
      this.selectdMonth = val
      this.getFlatList()
    },
    handleIndustrySort (val) {
      this.industrySort = val
      this.getFlatList()
    },
    // tab 行业 table
    async getFlatList () {
      const param = {
        range: this.rangeItemVal,
        group: this.groupItem,
        tmallMonthList: this.selectdMonth,
        id: this.categoryForm.id,
        sort: this.industrySort
      }
      this.isLoadingIndustryTable = true
      const res = await getFlatList(param)
      this.isLoadingIndustryTable = false
      if (res.code === 200) {
        this.industryTableData = res.result
      } else {
        this.$message.error('行业品类table数据请求失败')
      }
    },
    // tab 行业 趋势图
    async getIndustryEchart () {
      // const param = { id: 'test1', range: '1', group: '0', remark: 'define' }
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
    // 行业初始化时 monthOption
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
    this.getMonthOption()
      .then(() => {
        this.selectdMonth = this.monthOption[0]
      })
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
