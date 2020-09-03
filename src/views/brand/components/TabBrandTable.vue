
<template>
  <!-- header-cell-class-name="tableCellClass" -->
  <!-- cell-class-name="tableCellClass" -->
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    ref="table"
    stripe
    style="width: 100%">
    <el-table-column
      prop="category"
      label="子品类"
      width="180">
    </el-table-column>
    <el-table-column
      prop="salesCount"
      label="销量"
      align="right"
      width="180">
      <template #header>
        <div class="sort-button" @click="handleSort('salesCount')">销量
          <i :class="[activedSortKey == 'salesCount' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesCount | format}}</template>
    </el-table-column>
    <el-table-column
      prop="salesAmount"
      align="right"
      label="销售额">
      <template #header>
        <div class="sort-button"  @click="handleSort('salesAmount')">销售额
          <i :class="[activedSortKey == 'salesAmount' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesAmount | format}}</template>
    </el-table-column>
    <el-table-column
      align="right"
      label="销售趋势">
      <template>
        <span>echarts</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="salesCountAcc"
      align="right"
      label="销售额">
      <template #header>
        <div class="sort-button"  @click="handleSort('salesCountAcc')">销售额
          <i :class="[activedSortKey == 'salesCountAcc' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesCountAcc | percentage}}</template>
    </el-table-column>
    <el-table-column
      prop="gmvAcc"
      align="right"
      label="销售环比">
      <template #header>
        <div class="sort-button"  @click="handleSort('gmvAcc')">销售环比
          <i :class="[activedSortKey == 'gmvAcc' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvAcc | percentage}}</template>
    </el-table-column>
    <el-table-column
      prop="price"
      align="right"
      label="均价">
      <template #header>
        <div class="sort-button"  @click="handleSort('price')">均价
          <i :class="[activedSortKey == 'price' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
        </div>
      </template>
      <template slot-scope="{row}">{{row.price | format}}</template>
    </el-table-column>
    <el-table-column
      prop="price"
      align="right"
      label="时间">
      <template>{{new Date() | moment}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TabIndustryTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activedSortKey: ''
    }
  },
  methods: {
    handleSort (sortKey) {
      console.info(sortKey)
      this.activedSortKey = sortKey
      this.$refs.table.doLayout()
    }
  }
}
</script>

<style lang="stylus" scoped>
.sort-button
  cursor pointer

.active-sort
  color $base-blue

.el-table >>> .tableHeaderClass th
  background-color $table-header-bgc !important
  height 48px

.el-table >>> .tableCellClass
  border-bottom 0px
</style>
