<template>
  <div>
    <Title title="总销售趋势"/>
     <Echarts-Buttons
      :activeVal="activeButton"
      style="width: 100%"
      @handleEchartsClick="handleEchartsClick"/>
    <Line-And-Bar-Chart />
    <div style="display: flex; align-items: baseline; justify-content: space-between;">
      <Title title="按品牌展开"/>
      <Month-Options />
    </div>
    <Tab-Brand-Table :tableData="tableData"/>
  </div>
</template>

<script>
import { getIndustryTable } from '@/api/industry'
import TabBrandTable from '@/views/industry/components/TabBrandTable.vue'
export default {
  name: 'TabBrandForIndustry',
  components: { TabBrandTable },
  props: {
    categoryForm: {
      type: Object,
      default: () => {}
    },
    graininessItemVal: {
      type: String,
      default: ''
    },
    rangeItemVal: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeButton: 'sumSalescount',
      tableData: []
    }
  },
  watch: {
    rangeItemVal: function (params) {
      this.getEchartData()
    },
    graininessItemVal: function (params) {
      this.getEchartData()
    },
    categoryForm: {
      deep: true,
      immediate: true,
      handler: function (params) {
        this.getEchartData()
      }
    }
  },
  computed: {
    paramObj: function (params) {
      return Object.assign({ ...this.categoryForm }, { graininessItemVal: this.graininessItemVal, rangeItemVal: this.rangeItemVal })
    }
  },
  methods: {
    handleEchartsClick (item) {
      this.activeButton = item.value
    },
    getEchartData () {
      console.info(this.paramObj)
      this.getTableData()
    },
    async getTableData () {
      const param = {
        category: '面test_cat1',
        month: '202007'
      }
      const res = await getIndustryTable(param)
      if (res.code === 200) {
        this.tableData = res.result
        console.info(res.result)
      }
    }
  }
}
</script>
