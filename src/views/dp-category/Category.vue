<template>
  <div>
    <Cate-Form />
    <div class="flex-between-row">
      <Ghost-Button-Group
        type="ghost"
        formKey="viewItemVal"
        :options="DP_CATEGORY_LEVEL"
        :activeVal="viewItemVal"
        @handleClick="handleLevleClick"/>
      <Button-Group
        size="tiny"
        :options="GROUP_LEVEL"
        :activeVal="groupItemVal"
        @handleClick="handleGroupClick">
        <div class="filter-label" slot="label">时间粒度</div>
      </Button-Group>
    </div>
    <div class="flex-row">
      <Chart-Of-Map style="width: 30%; height: 279px;"/>
      <Chart-For-Province
        style="width: 70%; height: 279px;"
        :chartData="MOCK_CHART_FOR_PROVINCE"/>
    </div>
    <Table-For-Area />
    <Table-For-Cate />
    <Module-Title title="品牌排行"/>
    <Table-For-Brand />
  </div>
</template>

<script>
import componentsMixin from '@/views/dp-category/component.js'
import { DP_CATEGORY_LEVEL, GROUP_LEVEL } from '@/utils/const.js'
import { MOCK_CHART_FOR_PROVINCE } from '@/views/dp-category/mock.js'

export default {
  name: 'DpCategory',
  mixins: [componentsMixin],
  data () {
    return {
      DP_CATEGORY_LEVEL,
      GROUP_LEVEL,
      viewItemVal: 'province',
      groupItemVal: 'month',
      MOCK_CHART_FOR_PROVINCE
    }
  },
  methods: {
    handleLevleClick (k, v) {
      this[k] = v
    },
    handleGroupClick () {

    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-between-row
  display flex
  justify-content space-between
  align-items center
.flex-row
  display flex
  align-items center
</style>
