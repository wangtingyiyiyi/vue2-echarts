<template>
  <div>
    <Industry-Setting @handleFilter="drawerShow = $event" @brandOnSubmit="brandOnSubmit"/>
    <Empty-Line />
    <div class="industry-tab-wapper">
        <el-tabs v-model="activeName" style='width:100%' @tab-click="tabClick">
            <el-tab-pane label="行业概览" name="industry" lazy>

              <div v-if="hasCategory">
                <Title title="总销售趋势"/>
                <Industry-Chart style="width: 100%" ref="brandEchart" :industryEchart="industryEchart"/>
                <div style="display: flex; align-items: baseline; justify-content: space-between;">
                  <Title title="按子品类展开"/>
                  <Month-Options :monthOption="monthOption" :defaultMonth="defaultMonth"/>
                </div>
                <Tab-Industry-Table :tableData="mockTableData"/>
              </div>

              <div v-else>
                <Title title="总销售趋势"/>
                <Svg-Icon icon-class="empty" class="empty-svg"/>
                <div style="display: flex; align-items: baseline; justify-content: space-between;">
                  <Title title="按子品类展开"/>
                  <!-- <Month-Options :monthOption="monthOption" :defaultMonth="defaultMonth"/> -->
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
                <Tab-Brand-Table :tableData="tableData"/>
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
          :activeVal="graininessItemVal"
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
// import TabIndustryForIndustry from '@/views/industry/components/TabIndustry.vue'
// import TabBrandForIndustry from '@/views/industry/components/TabBrand.vue'
import Drawer from '@/components/Drawer.vue'
import IndustryDrawerSlot from '@/views/industry/components/IndustryDrawerSlot.vue'
import IndustryDrawerSlotBtn from '@/views/industry/components/IndustryDrawerSlotBtn.vue'
import TabBrandTable from '@/views/industry/components/TabBrandTable.vue'
import { mapMutations } from 'vuex'
import { getIndustryTable, getMonthOption, getIndustryEchart } from '@/api/industry'
import { mockTableData } from '@/mock.js'

export default {
  components: {
    IndustrySetting,
    // TabIndustryForIndustry,
    // TabBrandForIndustry,
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
      graininessItemVal: '0',
      drawerShow: false,
      categoryForm: {},
      tableData: [],
      mockTableData: mockTableData,
      monthOption: [],
      defaultMonth: [],
      industryEchart: {}
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
    handleGroupClick (graininessItem) {
      this.graininessItemVal = graininessItem.value
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
      this.getMonthOption()
      if (this.activeName === 'industry') {
        // 请求行业概览接口
        console.info('请求行业概览接口')
        this.getIndustryEchart()
      } else {
        console.info('请求品类排行接口')
        // 请求品类排行接口
      }
      // this.getTableData()
      this.SET_INDUSTRY_CATEGORY(data)
    },
    // tab 切换
    tabClick () {
      console.info(this.activeName)
    },
    async getTableData () {
      const param = {
        category: '面test_cat1',
        month: '202007'
      }
      const res = await getIndustryTable(param)
      if (res.code === 200) {
        this.tableData = res.result
        console.info(res.result)
      }
    },
    // 行业初始化时 monthOption
    async getMonthOption () {
      const res = await getMonthOption({ range: this.rangeItemVal, group: this.graininessItemVal })
      if (res.code === 200) {
        this.monthOption = res.result
        this.defaultMonth = res.result[0]
      }
    },
    // tab 行业 趋势图
    async getIndustryEchart () {
      // const param = { id: 'test1', range: '1', group: '0', remark: 'define' }
      const param = Object.assign({ ...this.categoryForm }, { range: this.rangeItemVal, group: this.graininessItemVal })
      const res = await getIndustryEchart(param)
      if (res.code === 200) {
        this.industryEchart = res.result
        console.info(this.industryEchart)
      } else {
        this.$message.error('行业概览总销售趋势图请求失败')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.industry-tab-wapper
  background-color #ffffff
  position relative

.right-tab
  position absolute
  right 0

.industry-drawer
  height 100vh
  position fixed
  right 0
  top 0
  z-index 2003

.empty-svg
  height 130px
  width 100%
  padding 80px 0
</style>
