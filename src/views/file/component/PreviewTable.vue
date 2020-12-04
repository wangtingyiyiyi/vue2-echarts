<template>
  <el-table
    :data="tableData"
    ref="excelTable"
    class="excel-table"
    header-row-class-name="excel-header-class"
    row-class-name="excel-row-class"
    stripe
    border>
    <el-table-column
      show-overflow-tooltip
      v-for="item in excelHeader"
      :key="item.label"
      :prop="item.prop"
      :align="item.align"
      min-width="120px"
      :label="item.label">
      <template slot-scope="{row}">
        <span  v-if="item.formatter">{{row[item.prop] | format}}</span>
        <span v-else>{{row[item.prop]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'PreviewTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    excelHeader: {
      type: Array,
      default: () => []
    },
    tableTotal: {
      type: [Number],
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.excel-table
  width 100%
  margin-top 10px

.excel-table >>> .excel-header-class th
  padding 0
  font-weight bolder
  font-size 14px
  color #111111

.excel-table >>> .excel-row-class td
  padding 0
  font-size 12px
  color #111111

.excel-table >>> .el-table__body-wrapper
  &::-webkit-scrollbar{
    width: 6px;
  }
  &::-webkit-scrollbar:horizontal{
    height: 8px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 6px;
    background-color: #ccc;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-corner{
    display: none;
  }
</style>
