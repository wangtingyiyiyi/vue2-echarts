<template>
  <div v-if="tableData.length !== 0">
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
    <div style="margin-top: 4px">
      <span>当前共有 {{tableTotal | format}} 条数据</span>
      <span v-if="tableTotal > max">, <span style="color: rgb(245, 108, 108);">已超出Excel的最大行数({{max | format}})</span></span>
    </div>
  </div>
  <div v-else>{{emptyMes}}</div>
</template>

<script>
export default {
  name: 'PriviewTable',
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
    },
    emptyMes: {
      type: String,
      default: '请选择配置项'
    }
  },
  data () {
    return {
      max: 1048576
    }
  }
}
</script>

<style lang="stylus" scoped>
.excel-table
  width 100%

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
