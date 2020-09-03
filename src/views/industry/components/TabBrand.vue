<template>
  <div>
    <Title title="总销售趋势"/>
     <Echarts-Buttons
      :activeVal="activeButton"
      @handleEchartsClick="handleEchartsClick"/>
    <Line-And-Bar-Chart />
    <div style="display: flex; align-items: baseline; justify-content: space-between;">
      <Title title="按品牌展开"/>
      <Month-Options />
    </div>
    <Tab-Brand-Table />
  </div>
</template>

<script>
import TabBrandTable from '@/views/industry/components/TabBrandTable.vue'
export default {
  name: 'TabBrandForIndustry',
  components: { TabBrandTable },
  data () {
    return {
      activeButton: 'sumSalescount'
    }
  },
  methods: {
    handleEchartsClick (item) {
      this.activeButton = item.value
    }
  }
}
</script>
