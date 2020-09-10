
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
      prop="outCat1"
      label="子品类"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sumSales"
      label="销量"
      align="center"
      width="180">
      <template #header>
        <div class="sort-button" @click="handleSort('0')">销量
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '0' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumSales | format}}</template>
    </el-table-column>
    <el-table-column
      prop="sumGmv"
      align="center"
      label="销售额">
      <template #header>
        <div class="sort-button"  @click="handleSort('1')">销售额
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '1' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumGmv | format}}</template>
    </el-table-column>
    <!-- class-name="line-in-table-class" -->
    <!-- <el-table-column width="150px"></el-table-column> -->
    <el-table-column
      align="center"
      label="销售额趋势">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
      </template>
    </el-table-column>
    <el-table-column
      prop="salesSequential"
      align="center"
      label="销售环比">
      <template #header>
        <div class="sort-button"  @click="handleSort('2')">销售环比
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '2' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesSequential | percentage}}</template>
    </el-table-column>
    <el-table-column
      prop="gmvSequential"
      align="center"
      label="销售额环比">
      <template #header>
        <div class="sort-button"  @click="handleSort('3')">销售额环比
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '3' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvSequential | percentage}}</template>
    </el-table-column>
    <el-table-column
      prop="avgPrice"
      align="center"
      label="均价">
      <template #header>
        <div class="sort-button"  @click="handleSort('avgPrice')">均价
          <Svg-Icon icon-class="icon-descending" :class="[activedSortKey == 'avgPrice' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.avgPrice | format}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import { refLoading } from '@/utils/element.js'
export default {
  name: 'TabBrandTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    activedSortKey: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      loadingInstance: null
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
    handleSort (sortKey) {
      this.$emit('handleBrandSort', sortKey)
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
