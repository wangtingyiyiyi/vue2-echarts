<template>
  <div>
    <Brand-Setting @brandOnSubmit="handleSettingParam"/>
    <Empty-Line />

    <div class="brand-tab-wapper">
      <el-tabs v-model="activeName" style='width:100%'>
          <el-tab-pane label="品牌概览" name="first" lazy>
            <Brand-Tab-Brand :settingParam="brandFormParam"/>
          </el-tab-pane>
          <el-tab-pane label="店铺数据" name="second" lazy>
            <Brand-Tab-Shop />
          </el-tab-pane>
      </el-tabs>

      <Range-Buttons
        :activeVal="brandFormParam.range"
        @handleRangeClick="brandFormParam.range = $event.value"
        style='position: absolute; right:350px; top:15px;'/>
      <GraininessButtons
        :activeVal="brandFormParam.graininess"
        @handleGraininessClick="brandFormParam.graininess = $event.value"
        style='position: absolute; right:10px; top:15px;'/>
    </div>

  </div>
</template>

<script>
import BrandSetting from '@/views/brand/components/BrandSetting.vue'
import BrandTabBrand from '@/views/brand/components/TabBrand.vue'
import BrandTabShop from '@/views/brand/components/TabShop.vue'

const brandFormParam = { brandId: [], cid: [], range: 'year', graininess: 'month' }

export default {
  components: { BrandSetting, BrandTabBrand, BrandTabShop },
  data () {
    return {
      activeName: 'second',
      brandFormParam: brandFormParam
    }
  },
  computed: {
    hasBrandFormparam () {
      return Object.keys(this.brandFormParam).length !== 0
    }
  },
  methods: {
    handleSettingParam (param) {
      this.brandFormParam = Object.assign(this.brandFormParam, param)
    }
  }
}
</script>

<style lang="stylus" scoped>
.brand-tab-wapper
  background-color #ffffff
  position relative

.brand-tab-wapper >>> .el-tabs__item
  padding-left 25px !important
  font-size 16px
  line-height 56px
  height 56px

</style>
