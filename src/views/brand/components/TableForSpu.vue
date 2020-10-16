
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    stripe
    ref="table"
    :cell-class-name="renderCell"
    @cell-click="handleClick"
    style="width: 100%">
    <el-table-column
      prop="spuname"
      label="SPU名称">
    </el-table-column>
    <el-table-column
      prop="shopname"
      show-overflow-tooltip
      width="120px"
      label="店铺名称">
    </el-table-column>
    <el-table-column align="right" min-width="30px">
      <template #header>
        <div class="sort-button"  @click="handleSort('0')">销量
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '0' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumSales | format}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="30px">
      <template #header>
        <div class="sort-button"  @click="handleSort('1')">销售额
          <Svg-Icon icon-class="descending" :class="[sortItemVal === '1' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">¥{{row.sumGmv | format}}</template>
    </el-table-column>
    <el-table-column align="center" width="200" label="销售趋势">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="30px">
      <template #header>
        <div class="sort-button"  @click="handleSort('2')">销售额环比
          <Svg-Icon icon-class="descending" :class="[sortItemVal === '2' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="30px">
      <template #header>
        <div class="sort-button"  @click="handleSort('4')">均价
          <Svg-Icon icon-class="descending" :class="[sortItemVal === '4' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">¥{{row.avgPrice | format}}</template>
    </el-table-column>
    <el-table-column width="10px"></el-table-column>
  </el-table>
</template>

<script>
import tableMixins from '@/views/brand/components/tableMixins.js'
export default {
  name: 'TableForShop',
  mixins: [tableMixins],
  methods: {
    handleClick (row, column) {
      if (column.property === 'spuname') {
        window.open(row.spuUrl)
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

<style lang="stylus" scoped>
@import './table.styl'
</style>
