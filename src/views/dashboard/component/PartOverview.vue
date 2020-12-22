<template>
  <div class="flex-row">
    <div class="module" style="border: none">
      <div class="module-item m-b-5">
        <div class="label-title">全行业:</div>
        <div>{{data.date|moment('YYYYMM')}}</div>
      </div>
      <div class="module-item">
        <div class="text-second font-size-12">更新时间:</div>
        <div class="text-second font-size-12">{{data.update|moment('YYYY-MM-DD')}}</div>
      </div>
    </div>
    <div
      v-for="(item, index) in DASHBOARD_OVERVIEW"
      :key="index"
      class="module">
      <div class="module-item m-b-5">
        <div class="label-title">{{item.label}}:</div>
        <div class="label-value">
          {{data[item.labelKey]|million()|format()}}万
          <i v-if="data[item.orderKey] > 0" class="el-icon-caret-top"  style="color: #EB7E65"></i>
          <i v-else-if="data[item.orderKey] < 0" class="el-icon-caret-bottom"  style="color: #5AD8A6"></i>
        </div>
      </div>
      <div class="module-item">
        <div class="text-second font-size-12">{{item.secondLabel}}:</div>
        <div class="text-second font-size-12">{{data[item.secondKey]|million()|format()}}万</div>
      </div>
    </div>
  </div>
</template>

<script>
import { MOCK_DASHBOARD_OVERVIEW, DASHBOARD_OVERVIEW } from '@/utils/const.js'
export default {
  name: 'PartOverview',
  data () {
    return {
      data: MOCK_DASHBOARD_OVERVIEW,
      DASHBOARD_OVERVIEW
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-row
  display flex
  justify-content: space-between

.module
  display flex
  align-items center
  flex-direction column
  width 100%
  padding 0 30px
  border-left  1px solid #7274871A
  .module-item
    display flex
    align-items: center;
    width: inherit;
    div
      width 50%
    div:first-child
      text-align right
    div:last-child
      margin-left 8px
    .label-title
      font-weight bold
      color $color-second
    .label-value
      color $base-blue
      font-weight bold
</style>
