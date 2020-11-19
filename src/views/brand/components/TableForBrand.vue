
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    cell-class-name="tableCellClass"
    ref="table"
    style="width: 100%"
    lazy
    row-key="label"
    :load="load">
    <el-table-column label="子品类">
      <template slot-scope="{row}">
        <Text-Button
          style="display: inline;"
          :text="row.category"
          @handleClick="handleCategory(row)"/>
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="60">
      <template #header>
        <Table-Sort-Button
          title="销量"
          sortVal="sales"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.sales | format}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="60">
      <template #header>
        <Table-Sort-Button
          title="销售额"
          sortVal="gmv"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">¥{{row.gmv | format}}</template>
    </el-table-column>
    <el-table-column align="center" width="200" label="销售趋势">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvList" :xAxisData="row.monthList"/>
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="40px">
      <template #header>
        <Table-Sort-Button
          title="销量环比"
          sortVal="salesRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.salesRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="50px">
      <template #header>
        <Table-Sort-Button
          title="销售额环比"
          sortVal="gmvRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.gmvRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="45">
      <template #header>
        <Table-Sort-Button
          title="均价"
          sortVal="avgPrice"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">¥{{row.avgPrice | format}}</template>
    </el-table-column>
    <el-table-column width="10px"></el-table-column>
    <div slot="empty">{{emptyText}}</div>
  </el-table>
</template>

<script>
// import tableMixins from '@/views/brand/components/tableMixins.js'
import TextButton from '@/components/TextButton.vue'
import { getIndustryFlatList } from '@/api/industry'
import { mapState } from 'vuex'
import tableLoadingMixin from '@/utils/mixin/tableLoading.js'

export default {
  name: 'TableForBrand',
  mixins: [tableLoadingMixin],
  props: {
    paramOfBrandTable: {
      type: Object,
      default: () => {}
    }
  },
  components: { TextButton },
  computed: {
    ...mapState('brand', ['activeBrand'])
  },
  methods: {
    handleSort (sortVal) {
      this.$emit('changeSortItemVal', sortVal)
    },
    // 携带点击的节点信息，打开新页面
    handleCategory (data) {
      const { href } = this.$router.resolve({
        path: '/brand',
        query: {
          brandList: JSON.stringify(this.activeBrand),
          cateList: JSON.stringify({
            category: data.category,
            category1: data.category1,
            category2: data.category2,
            category3: data.category3,
            rank: data.rank,
            label: data.label
          })
        }
      })
      window.open(href)
    },
    async load (tree, treeNode, resolve) {
      const cateTableParam = { ...this.paramOfBrandTable }
      const param = Object.assign(cateTableParam, {
        cateList: [{
          category1: tree.category1,
          category2: tree.category2,
          category3: tree.category3,
          rank: tree.rank
        }]
      })
      const res = await getIndustryFlatList(param)
      if (res.code === 200) {
        resolve(res.result)
      } else {
        this.$message.error('加载子分类失败')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './table.styl'
</style>
