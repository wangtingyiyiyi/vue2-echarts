
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    ref="table"
    stripe
    style="width: 100%">
    <el-table-column
      prop="shopName"
      label="店铺名"
      width="180">
    </el-table-column>
    <el-table-column align="right" width="180">
      <template #header>
        <div class="sort-button"  @click="handleSort('0')">销量
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '0' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumSales | format}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('1')">销售额
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '1' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">¥{{row.sumGmv | format}}</template>
    </el-table-column>
    <el-table-column align="center" width="160" label="销售趋势">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('2')">销售环比
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '2' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('3')">销售额环比
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '3' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" label="均价">
      <template slot-scope="{row}">¥{{row.avgPrice | format}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import tableMixins from '@/views/brand/components/tableMixins.js'
export default {
  name: 'TableForShop',
  mixins: [tableMixins]
}
</script>

<style lang="stylus" scoped>
@import './table.styl'
</style>
