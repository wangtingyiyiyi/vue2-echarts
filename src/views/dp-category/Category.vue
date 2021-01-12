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
    <div class="flex-row m-b-10">
      <div style="width: 30%;">
        <Tips slot="tips" title="点击省份可查看对应数据" icon="descending" />
        <Chart-Of-Map
          ref="ChartMap"
          v-if="viewItemVal === 'province'"
          style="width: 100%; height: 279px;"
          @handleMapClick="handleMapClick">
        </Chart-Of-Map>
        <Chart-For-City
          ref="ChartMap"
          v-else-if="viewItemVal === 'level'"
          style="width: 100%; height: 279px;"
          @handleMapClick="handleMapClick"/>
        <el-radio-group
          v-model="typeItemVal"
          class="text-center"
          @change="handleTypeChange">
          <el-radio
            v-for="item in DP_FILTER_OPTION"
            :key="item.value"
            :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <Chart-For-Province
        ref="ChartProvince"
        style="width: 70%; height: 300px;"
        :title="activedChartItem.name || ''"
        :reload="reloadChartProvince"
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
import { DP_CATEGORY_LEVEL, GROUP_LEVEL, DP_FILTER_OPTION } from '@/utils/const.js'
import { MOCK_CHART_FOR_PROVINCE } from '@/views/dp-category/mock.js'
import { refLoading } from '@/utils/element.js'

export default {
  name: 'DpCategory',
  mixins: [componentsMixin],
  data () {
    return {
      DP_CATEGORY_LEVEL,
      DP_FILTER_OPTION,
      MOCK_CHART_FOR_PROVINCE,
      GROUP_LEVEL,
      viewItemVal: 'level', // 省份筛选-线级筛选
      groupItemVal: 'month', // 时间粒度
      typeItemVal: 'shop', // 门店-净增
      activedChartItem: {
        name: '全国'
      },
      reloadChartProvince: false
    }
  },
  methods: {
    handleLevleClick (k, v) {
      this[k] = v
    },
    handleGroupClick () {},
    handleTypeChange () {
      const loadingInstance = refLoading(this.$refs.ChartMap.$el)
      setTimeout(() => {
        loadingInstance.close()
      }, 2000)
    },
    handleMapClick (params) {
      this.activedChartItem = params
      this.reloadChartProvince = true
      const loadingInstance = refLoading(this.$refs.ChartProvince.$el)
      setTimeout(() => {
        this.reloadChartProvince = false
        loadingInstance.close()
      }, 2000)
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
.text-center
  width 100%
  text-align center
</style>
