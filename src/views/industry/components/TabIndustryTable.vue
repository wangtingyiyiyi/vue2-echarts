
<template>
  <!-- header-cell-class-name="tableCellClass" -->
  <!-- cell-class-name="tableCellClass" -->
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    ref="table"
    stripe
    style="width: 100%">
    <el-table-column width="20"></el-table-column>
    <el-table-column prop="outCat2" label="子品类">
      <template slot-scope="{row}">
        <Text-Button :text="getCat(row)" @handleClick="handleCategory(row)" class="font-size-12" />
      </template>
    </el-table-column>
    <el-table-column align="right" width="90">
      <template #header>
        <div class="sort-button" @click="handleSort('sumSales')">销量
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '0' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumSales | format}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('sumGmv')">销售额
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '1' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumGmv | format}}</template>
    </el-table-column>
    <el-table-column width="40"></el-table-column>
    <el-table-column align="center" width="200" label="销售趋势">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvBeanList"/>
      </template>
    </el-table-column>
    <el-table-column align="right" width="110">
      <template #header>
        <div class="sort-button"  @click="handleSort('salesSequential')">销量环比
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '2' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('gmvSequential')">销售额环比
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '3' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" label="均价">
      <template slot-scope="{row}">{{row.avgPrice | format}}</template>
    </el-table-column>
    <el-table-column width="50"></el-table-column>
  </el-table>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import { refLoading } from '@/utils/element.js'
import { SORT_TYPES } from '@/utils/const.js'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'TabIndustryTable',
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
      loadingInstance: null,
      sortTypes: SORT_TYPES
    }
  },
  components: { TextButton },
  computed: {
    ...mapState('industry', ['categoryObj']),
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
    ...mapMutations('industry', ['SET_INDUSTRY_CATEGORY']),
    getCat (data) {
      console.info(this.categoryObj.remark)
      switch (this.categoryObj.remark) {
        case 'define':
          return data.outCat1
        case '1':
          return data.outCat2
        case '2':
          return data.outCat2
        default:
          return ''
      }
    },
    handleCategory (data) {
      const mockParam = {
        id: '7869',
        label: '彩妆/美护工具 > 美妆工具',
        remark: '2'
      }
      console.info(data, mockParam)
      this.SET_INDUSTRY_CATEGORY(mockParam)
      this.$emit('handleCate')
    },
    handleSort (sortKey) {
      this.$emit('handleIndustrySort', this.sortTypes[sortKey])
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
