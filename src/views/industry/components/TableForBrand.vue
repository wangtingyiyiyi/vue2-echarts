
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    cell-class-name="tableCellClass"
    ref="table"
    style="width: 100%; min-height: 100%">
    <el-table-column prop="brand" label="品牌">
      <template slot-scope="{row}">
        <Text-Button
          :text="row.brand"
          @handleClick="handleBrand(row)"
          style="display: inline" />
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="60px">
      <template #header>
        <Table-Sort-Button
          title="销量"
          sortVal="sales"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.sales | format}}</template>
    </el-table-column>
    <el-table-column align="right" label="销售额" min-width="70">
      <template #header>
        <Table-Sort-Button
          title="销售额"
          sortVal="gmv"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">¥{{row.gmv | format}}</template>
    </el-table-column>
    <el-table-column align="center" label="销售额趋势" min-width="70">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvList" :xAxisData="row.monthList"/>
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="40px">
      <template #header>
        <Table-Sort-Button
          title="销量环比"
          sortVal="salesRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.salesRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="60px">
      <template #header>
        <Table-Sort-Button
          title="销售额环比"
          sortVal="gmvRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.gmvRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="45">
      <template #header>
        <Table-Sort-Button
          title="均价"
          sortVal="avgPrice"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">¥{{Math.round(row.avgPrice) | format}}</template>
    </el-table-column>
    <el-table-column width="10px"></el-table-column>
    <div slot="empty">{{emptyText}}</div>
  </el-table>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import { mapState } from 'vuex'
import tableLoadingMixin from '@/utils/mixin/tableLoading.js'

export default {
  name: 'TableForBrand',
  mixins: [tableLoadingMixin],
  components: { TextButton },
  computed: {
    ...mapState('industry', ['categoryObj'])
  },
  methods: {
    handleBrand (row) {
      // 当前为自定义品类
      let cateList = JSON.stringify(this.categoryObj)
      if (this.categoryObj.rank.toString() === '0') {
        cateList = JSON.stringify({ rank: 0, label: '全部', category: '全部' })
      }
      const { href } = this.$router.resolve({
        path: '/brand',
        query: {
          brandList: JSON.stringify(row.brand),
          cateList: cateList
        }
      })
      window.open(href)
    }
  }
}
</script>
