
<template>
  <!-- header-cell-class-name="tableCellClass" -->
  <!-- cell-class-name="tableCellClass" -->
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    ref="table"
    stripe
    lazy
    row-key="categoryId"
    :load="load"
    style="width: 100%">
    <!-- <el-table-column width="10"></el-table-column> -->
    <el-table-column prop="outCat2" label="子品类">
      <template slot-scope="{row}">
        <Text-Button :text="getCat(row)" @handleClick="handleCategory(row)" style="display: inline" class="font-size-12" />
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
        <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
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
    <!-- <el-table-column width="10"></el-table-column> -->
  </el-table>
</template>

<script>
import { getIndustryFlatList } from '@/api/industry'
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
    ...mapState('industry', ['categoryObj', 'cateTableParam']),
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
    // 显示品类
    getCat (data) {
      switch (data.remark) {
        case 'define':
          return data.outCat1
        case '1':
          return data.outCat1
        case '2':
          return data.outCat2
        case '3':
          return data.outCat3
        default:
          return ''
      }
    },
    // 查询点击节点
    handleCategory (data) {
      const param = {
        id: data.categoryId,
        label: this.getCat(data),
        remark: data.remark
      }
      this.SET_INDUSTRY_CATEGORY(param)
      this.$emit('handleCate')
    },
    // 查询子节点
    async load (tree, treeNode, resolve) {
      const cateTableParam = { ...this.cateTableParam }
      const param = Object.assign(cateTableParam, { id: tree.categoryId, remark: tree.remark })
      const res = await getIndustryFlatList(param)
      if (res.code === 200) {
        resolve(res.result)
      } else {
        this.$message.error('加载子分类失败')
      }
    },
    // 排序
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
