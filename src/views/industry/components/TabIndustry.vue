<template>
  <div>
    <Title title="总销售趋势"/>

    <Line-Chart
      style="width: 100%"
      ref="brandEchart"/>

    <div style="display: flex; align-items: baseline; justify-content: space-between;">
      <Title title="按子品类展开"/>
      <Month-Options />
    </div>

    <Tab-Industry-Table
      :tableData="mockTableData"/>

  </div>
</template>

<script>
import TabIndustryTable from '@/views/industry/components/TabIndustryTable.vue'

import { mockTableData } from '@/mock.js'
export default {
  name: 'TabIndustryForIndustry',
  components: { TabIndustryTable },
  data () {
    return {
      mockTableData: mockTableData
    }
  }
}
</script>
