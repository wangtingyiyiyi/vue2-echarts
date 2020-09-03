<template>
  <div>
    <Industry-Setting />
    <Empty-Line />
    <div class="industry-tab-wapper">
        <el-tabs v-model="activeName" style='width:100%'>
            <el-tab-pane label="品牌概览" name="first" lazy>
              <Tab-Industry-For-Industry />
            </el-tab-pane>
            <el-tab-pane label="店铺数据" name="second" lazy>
              <Tab-Brand-For-Industry />
            </el-tab-pane>
        </el-tabs>
        <Range-Buttons
          :activeVal="rangeItemVal"
          @handleRangeClick="handleRangeClick"
          style='position: absolute; right:350px; top:5px;'/>
        <GraininessButtons
          :activeVal="graininessItemVal"
          @handleGraininessClick="handleGraininessClick"
          style='position: absolute; right:10px; top:5px;'/>
    </div>
    <Drawer :visible="drawerShow" class="industry-drawer" @handleDrawerClose="handleDrawerClose">
        <!-- 抽屉按钮slot -->
        <IndustryDrawerSlotBtn
          slot="button"
          :drawerShow="drawerShow"
          @handleDrawerBtn="handleDrawerBtn"/>
        <!-- 抽屉内容slot -->
        <Industry-Drawer-Slot/>
    </Drawer>
  </div>
</template>

<script>
import IndustrySetting from '@/views/industry/components/IndustrySetting.vue'
import TabIndustryForIndustry from '@/views/industry/components/TabIndustry.vue'
import TabBrandForIndustry from '@/views/industry/components/TabBrand.vue'
import Drawer from '@/components/Drawer.vue'
import IndustryDrawerSlot from '@/views/industry/components/IndustryDrawerSlot.vue'
import IndustryDrawerSlotBtn from '@/views/industry/components/IndustryDrawerSlotBtn.vue'

export default {
  components: {
    IndustrySetting,
    TabIndustryForIndustry,
    TabBrandForIndustry,
    Drawer,
    IndustryDrawerSlot,
    IndustryDrawerSlotBtn
  },
  data () {
    return {
      activeName: 'first',
      rangeItemVal: 'year',
      graininessItemVal: 'month',
      drawerShow: false
    }
  },
  methods: {
    handleRangeClick (rangeItem) {
      this.rangeItemVal = rangeItem.value
    },
    handleGraininessClick (graininessItem) {
      this.graininessItemVal = graininessItem.value
    },
    handleDrawerBtn () {
      this.drawerShow = !this.drawerShow
    },
    handleDrawerClose (value) {
      this.drawerShow = value
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
  z-index 9999
</style>
