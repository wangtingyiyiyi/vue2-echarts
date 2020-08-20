<template>
  <div>
    <Brand-Setting />
    <Empty-Line />
    <div class="brand-tab-wapper">
        <el-tabs v-model="activeName" style='width:100%'>
            <el-tab-pane label="品牌概览" name="first" lazy>
              <Tab-Brand title="品牌概览title" hello="hello" @handleBtnClick="handleBtnClick"/>
            </el-tab-pane>
            <el-tab-pane label="店铺数据" name="second" lazy>
              <Tab-Shop />
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
  </div>
</template>

<script>
import BrandSetting from '@/views/brand/components/BrandSetting.vue'
import TabBrand from '@/views/brand/components/TabBrand.vue'
import TabShop from '@/views/brand/components/TabShop.vue'
export default {
  components: { BrandSetting, TabBrand, TabShop },
  provide: {
    name: 'Garrett'
  },
  data () {
    return {
      activeName: 'first',
      rangeItemVal: 'year',
      graininessItemVal: 'month'
    }
  },
  methods: {
    handleBtnClick (text) {
      // console.info('text form a')
    },
    handleRangeClick (rangeItem) {
      this.rangeItemVal = rangeItem.value
    },
    handleGraininessClick (graininessItem) {
      this.graininessItemVal = graininessItem.value
    }
  }
}
</script>

<style lang="stylus" scoped>
.brand-tab-wapper
  background-color #ffffff
  position relative

.right-tab
  position absolute
  right 0
</style>
