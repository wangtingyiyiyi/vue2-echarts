
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    cell-class-name="tableCellClass"
    ref="table"
    stripe
    style="width: 100%">
    <el-table-column prop="brand" label="品牌">
      <template slot-scope="{row}">
        <Text-Button :text="row.brand" @handleClick="handleBrand(row)" style="display: inline" />
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button" @click="handleSort('0')">销量
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '0' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumSales | format}}</template>
    </el-table-column>
    <el-table-column align="right" label="销售额">
      <template #header>
        <div class="sort-button"  @click="handleSort('1')">销售额
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '1' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">¥{{row.sumGmv | format}}</template>
    </el-table-column>
    <el-table-column align="center" label="销售额趋势" width="160px">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
      </template>
    </el-table-column>
    <el-table-column align="right"  width="110">
      <template #header>
        <div class="sort-button"  @click="handleSort('2')">销售环比
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '2' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('3')">销售额环比
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '3' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('4')">均价
          <Svg-Icon icon-class="descending" :class="[activedSortKey == '4' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">¥{{row.avgPrice | format}}</template>
    </el-table-column>
    <el-table-column width="10px"></el-table-column>
  </el-table>
</template>

<script>
import { refLoading } from '@/utils/element.js'
import TextButton from '@/components/TextButton.vue'

export default {
  name: 'TableForBrand',
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
  components: { TextButton },
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
    },
    handleBrand (row) {
      const { href } = this.$router.resolve({
        path: '/brand',
        query: {
          id: 0,
          brandList: JSON.stringify([{
            brandId: row.brandId,
            brand: row.brand,
            brandSql: row.brand
          }])
        }
      })
      window.open(href)
    }
  }
}
</script>

<style lang="stylus" scoped>
.sort-button
  cursor pointer

.active-sort
  color $base-blue

.el-table >>> .line-in-table-class > div
  margin-left 60px
</style>
