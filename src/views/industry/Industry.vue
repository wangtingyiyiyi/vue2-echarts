<template>
  <div>
    <Industry-Setting @handleFilter="drawerShow = $event" @brandOnSubmit="brandOnSubmit"/>
    <Empty-Line />
    <div class="industry-tab-wapper">
        <el-tabs v-model="activeName" style='width:100%' @tab-click="tabClick">
            <el-tab-pane label="行业概览" name="first" lazy>
              <Tab-Industry-For-Industry v-if="hasCategory" />
              <div v-else>
                <Title title="总销售趋势"/>
                <Svg-Icon icon-class="empty" class="empty-svg"/>
                <Title title="按子品类展开"/>
                <Svg-Icon icon-class="empty" class="empty-svg"/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="品牌排行" name="second" lazy>
              <div v-if="hasCategory">
                <Title title="总销售趋势"/>
                <Echarts-Buttons
                  :activeVal="activeButton"
                  style="width: 100%"
                  @handleEchartsClick="handleEchartsClick"/>
                <Line-And-Bar-Chart />
                <div style="display: flex; align-items: baseline; justify-content: space-between;">
                  <Title title="按品牌展开"/>
                  <Month-Options />
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
        <GraininessButtons
          :activeVal="graininessItemVal"
          @handleGraininessClick="handleGraininessClick"
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
import IndustrySetting from '@/views/industry/components/IndustrySetting.vue'
import TabIndustryForIndustry from '@/views/industry/components/TabIndustry.vue'
// import TabBrandForIndustry from '@/views/industry/components/TabBrand.vue'
import Drawer from '@/components/Drawer.vue'
import IndustryDrawerSlot from '@/views/industry/components/IndustryDrawerSlot.vue'
import IndustryDrawerSlotBtn from '@/views/industry/components/IndustryDrawerSlotBtn.vue'
import TabBrandTable from '@/views/industry/components/TabBrandTable.vue'
import { mapMutations } from 'vuex'
import { getIndustryTable } from '@/api/industry'

export default {
  components: {
    IndustrySetting,
    TabIndustryForIndustry,
    // TabBrandForIndustry,
    Drawer,
    IndustryDrawerSlot,
    IndustryDrawerSlotBtn,
    TabBrandTable
  },
  data () {
    return {
      activeButton: 'sumSalescount',
      activeName: 'second',
      rangeItemVal: 'year',
      graininessItemVal: 'month',
      drawerShow: false,
      categoryForm: {},
      tableData: []
    }
  },
  computed: {
    hasCategory: function () {
      return Object.keys(this.categoryForm).length !== 0
    }
  },
  methods: {
    ...mapMutations('industry', ['SET_INDUSTRY_CATEGORY']),
    handleRangeClick (rangeItem) {
      this.rangeItemVal = rangeItem.value
    },
    handleEchartsClick (item) {
      this.activeButton = item.value
    },
    handleGraininessClick (graininessItem) {
      this.graininessItemVal = graininessItem.value
    },
    handleDrawerBtn () {
      this.drawerShow = !this.drawerShow
    },
    handleDrawerClose (value) {
      this.drawerShow = value
    },
    brandOnSubmit (data) {
      this.categoryForm = { ...data }
      this.getTableData()
      this.SET_INDUSTRY_CATEGORY(data)
    },
    tabClick () {
      this.rangeItemVal = 'year'
      this.graininessItemVal = 'month'
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
