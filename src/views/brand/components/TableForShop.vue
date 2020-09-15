
<template>
  <!-- header-cell-class-name="tableCellClass" -->
  <!-- cell-class-name="tableCellClass" -->
  <div>
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
          <div class="sort-button" @click="handleSort('0')">销量
            <i :class="[sortItemVal === '0' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
          </div>
        </template>
        <template slot-scope="{row}">{{row.sumSales | format}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <div class="sort-button"  @click="handleSort('1')">销售额
            <i :class="[sortItemVal === '1' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
          </div>
        </template>
        <template slot-scope="{row}">{{row.sumGmv | format}}</template>
      </el-table-column>
    <el-table-column width="40"></el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="销售趋势">
        <template slot-scope="{row}">
          <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <div class="sort-button"  @click="handleSort('2')">销售环比
            <i :class="[sortItemVal === '2' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
          </div>
        </template>
        <template slot-scope="{row}">{{row.salesSequential | percentage}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <div class="sort-button"  @click="handleSort('3')">销售额环比
            <i :class="[sortItemVal === '3' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
          </div>
        </template>
        <template slot-scope="{row}">{{row.gmvSequential | percentage}}</template>
      </el-table-column>
      <el-table-column align="right" label="均价">
        <!-- <template #header>
          <div class="sort-button"  @click="handleSort('avgPrice')">均价
            <i :class="[activedSortKey == 'avgPrice' ? 'active-sort' : '', 'el-icon-caret-bottom']"></i>
          </div>
        </template> -->
        <template slot-scope="{row}">{{row.avgPrice | format}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { refLoading } from '@/utils/element.js'
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
  computed: {
    tableBody () {
      return this.$refs.table.$refs.bodyWrapper
    }
  },
  watch: {
    isLoading: {
      immediate: true,
      handler: function (isLoading) {
        if (isLoading) {
          this.loadingInstance = refLoading(this.tableBody)
        } else {
          if (this.loadingInstance) {
            this.loadingInstance.close()
          }
        }
      }
    }
  },
  methods: {
    handleSort (sortVal) {
      console.info(sortVal)
      this.$emit('changeSortItemVal', sortVal)
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
