
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    ref="table"
    :cell-class-name="renderCell"
    @cell-click="handleClick"
    style="width: 100%">
    <el-table-column
      prop="spuname"
      min-width="100"
      label="SPU名称">
    </el-table-column>
    <el-table-column
      prop="shopname"
      min-width="50"
      label="店铺名称">
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
    <el-table-column align="right" min-width="60px">
      <template #header>
         <Table-Sort-Button
          title="销售额"
          sortVal="gmv"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">¥{{row.gmv | format}}</template>
    </el-table-column>
    <el-table-column align="center" min-width="70" label="销售趋势">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvList" :xAxisData="row.monthList"/>
      </template>
    </el-table-column>
    <el-table-column align="right"  min-width="50px">
      <template #header>
        <Table-Sort-Button
          title="销量环比"
          sortVal="salesRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.salesRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="50px">
      <template #header>
        <Table-Sort-Button
          title="销售额环比"
          sortVal="gmvRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.gmvRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right"  min-width="45">
      <template #header>
        <Table-Sort-Button
          title="均价"
          sortVal="avgPrice"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">¥{{Math.round(row.avgPrice)| format}}</template>
    </el-table-column>
    <el-table-column width="10px"></el-table-column>
    <div slot="empty">{{emptyText}}</div>
  </el-table>
</template>

<script>
import tableLoadingMixin from '@/utils/mixin/tableLoading.js'

export default {
  name: 'TableForShop',
  mixins: [tableLoadingMixin],
  methods: {
    handleClick (row, column) {
      if (column.property === 'spuname') {
        window.open(`http://detail.tmall.com/item.htm?id=${row.spuid}`)
      }
    },
    renderCell ({ column }) {
      if (column.property === 'spuname') {
        return 'btn-text'
      }
    }
  }
}
</script>
