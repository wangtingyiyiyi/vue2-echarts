<template>
  <div>
    <Cate-Form />
    <div class="flex-between-row m-b-10">
      <div class="flex-row">
        <Ghost-Button-Group
          type="ghost"
          formKey="viewItemVal"
          :options="DP_CATEGORY_LEVEL"
          :activeVal="viewItemVal"
          @handleClick="handleLevleClick"/>
        <Current-Type
          v-if="activedChartItem.name"
          class="m-l-24"
          :title="'当前筛选: ' + activedChartItem.name"/>
      </div>

      <Button-Group
        size="tiny"
        :options="GROUP_LEVEL"
        :activeVal="groupItemVal"
        @handleClick="handleGroupClick">
        <div class="filter-label" slot="label">时间粒度</div>
      </Button-Group>
    </div>
    <div class="flex-row">
      <Chart-Of-Map
        style="width: 30%; height: 279px;"
        @handleMapClick="handleMapClick">
        <Tips slot="tips" title="点击省份可查看对应数据">
          <Svg-Icon class="m-r-8" icon-class="descending" />
        </Tips>
      </Chart-Of-Map>
      <Chart-For-Province
        style="width: 70%; height: 279px;"
        :title="activedChartItem.name || ''"
        :chartData="MOCK_CHART_FOR_PROVINCE">
      </Chart-For-Province>
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
      MOCK_CHART_FOR_PROVINCE,
      activedChartItem: {
        name: '辽宁省'
      }
    }
  },
  methods: {
    handleLevleClick (k, v) {
      this[k] = v
    },
    handleGroupClick () {

    },
    handleMapClick (params) {
      this.activedChartItem = params
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
