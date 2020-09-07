
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
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="salesCount"
      label="销量"
      align="center"
      width="180">
      <template #header>
        <div class="sort-button" @click="handleSort('salesCount')">销量
          <Svg-Icon icon-class="icon-descending" :class="[activedSortKey == 'salesCount' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesCount | format}}</template>
    </el-table-column>
    <el-table-column
      prop="salesAmount"
      align="center"
      label="销售额">
      <template #header>
        <div class="sort-button"  @click="handleSort('salesAmount')">销售额
          <Svg-Icon icon-class="icon-descending" :class="[activedSortKey == 'salesAmount' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesAmount | format}}</template>
    </el-table-column>
    <!-- class-name="line-in-table-class" -->
    <!-- <el-table-column width="150px"></el-table-column> -->
    <el-table-column
      align="center"
      label="销售趋势">
      <template>
        <Line-In-Table />
        <!-- <div>的回复啊回复啊十分大</div> -->
      </template>
    </el-table-column>
    <el-table-column
      prop="salesCountAcc"
      align="center"
      label="销售额">
      <template #header>
        <div class="sort-button"  @click="handleSort('salesCountAcc')">销售额
          <Svg-Icon icon-class="icon-descending" :class="[activedSortKey == 'salesCountAcc' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesCountAcc | percentage}}</template>
    </el-table-column>
    <el-table-column
      prop="gmvAcc"
      align="center"
      label="销售环比">
      <template #header>
        <div class="sort-button"  @click="handleSort('gmvAcc')">销售环比
          <Svg-Icon icon-class="icon-descending" :class="[activedSortKey == 'gmvAcc' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvAcc | percentage}}</template>
    </el-table-column>
    <el-table-column
      prop="price"
      align="center"
      label="均价">
      <template #header>
        <div class="sort-button"  @click="handleSort('price')">均价
          <Svg-Icon icon-class="icon-descending" :class="[activedSortKey == 'price' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.price | format}}</template>
    </el-table-column>
    <el-table-column
      prop="price"
      align="center"
      label="时间">
      <template>{{new Date() | moment}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mockTableData } from '@/mock.js'
export default {
  name: 'TabBrandTable',
  // props: {
  //   tableData: {
  //     type: Array,
  //     default: () => []
  //   }
  // },
  data () {
    return {
      activedSortKey: '',
      tableData: mockTableData
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

.el-table >>> .line-in-table-class > div
  margin-left 60px
</style>
