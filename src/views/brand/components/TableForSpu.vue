
<template>
  <div>
    <el-table
      :data="tableData"
      header-row-class-name="tableHeaderClass"
      ref="table"
      stripe
      :cell-class-name="renderCell"
      @cell-click="handleClick"
      style="width: 100%">
      <el-table-column
        prop="spuname"
        show-overflow-tooltip
        label="SPU名称">
      </el-table-column>
      <el-table-column
        prop="outCat1"
        width="80"
        show-overflow-tooltip
        label="一级品类">
      </el-table-column>
      <el-table-column
        prop="outCat2"
        label="二级品类">
      </el-table-column>
      <el-table-column
        prop="outCat3"
        label="二级品类">
      </el-table-column>
      <el-table-column
        prop="shopname"
        label="店铺名称">
      </el-table-column>
      <el-table-column label="销售趋势图">
        <template slot-scope="{row}">
          <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="sort-button"  @click="handleSort('0')">销量
            <Svg-Icon icon-class="descending" :class="[sortItemVal == '0' ? 'active-sort' : '']"/>
          </div>
        </template>
        <template slot-scope="{row}">{{row.sumSalescount | format}}</template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="sort-button"  @click="handleSort('1')">GMV
            <Svg-Icon icon-class="descending" :class="[sortItemVal == '1' ? 'active-sort' : '']"/>
          </div>
        </template>
        <template slot-scope="{row}">{{row.sumGmv | format}}</template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="sort-button"  @click="handleSort('2')">环比
            <Svg-Icon icon-class="descending" :class="[sortItemVal == '2' ? 'active-sort' : '']"/>
          </div>
        </template>
        <template slot-scope="{row}">{{row.sequential | percentage}}</template>
      </el-table-column>
    </el-table>
    <el-table-column
      prop="avgPrice"
      label="均价">
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: 'TableForShop',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    sortItemVal: {
      type: String,
      default: '1'
    }
  },
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
.el-table >>> .btn-text
  color $base-blue
  cursor pointer

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
