<template>
  <div>
    <div class="bg-white flex-row">
      <Border class="m-r-30 part1">
        <Title-Icon slot='part1' icon="menu" title="行业流量" class="title-icon"/>
        <Module-List slot="part1" :list="DASHBOARD_INDUSTRY"/>
      </Border>
      <Border class="m-r-30 part2">
        <Title-Icon slot='part1' icon="brand" title="品牌数据" class="title-icon"/>
        <Module-List slot="part1" :list="DASHBOARD_BRAND"/>
      </Border>
      <Border class="part3">
        <Part-Frequency slot='part1' label="常搜行业" labelKey="category" class="m-b-12" :list="frequencyCate"/>
        <Part-Frequency slot='part2' label="常搜品牌" labelKey="brand" :list="frequencyBrand"/>
      </Border>
    </div>
    <Empty-Line />
    <Part-Overview class="bg-white"/>
    <Empty-Line />

    <div class="flex-row">
      <div class="bg-white">11</div>
      <div class="bg-white">22</div>
      <div class="bg-white">33</div>
    </div>
  </div>
</template>
<script>
import componentsMixin from '@/views/dashboard/component.js'
import { DASHBOARD_INDUSTRY, DASHBOARD_BRAND, INDUSTRY_DEFAULT_INDUSTRY, BRAND_DEFINE_BRANDLIST } from '@/utils/const.js'
export default {
  name: 'Home',
  mixins: [componentsMixin],
  data () {
    return {
      DASHBOARD_INDUSTRY,
      DASHBOARD_BRAND,
      frequencyCate: [INDUSTRY_DEFAULT_INDUSTRY],
      BRAND_DEFINE_BRANDLIST
    }
  },
  computed: {
    frequencyBrand () {
      return this.BRAND_DEFINE_BRANDLIST.map(item => {
        return { brand: item }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg-white
  background-color #ffffff
  padding 22px

.flex-row
  display flex
  .part1
    flex-grow 2
  .part2
    flex-grow 1
  .part3
    flex-grow 0.5

.title-icon
  text-align center
  padding-bottom 40px

</style>
