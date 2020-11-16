
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    cell-class-name="tableCellClass"
    ref="table"
    style="width: 100%"
    lazy
    row-key="id"
    :load="load">
    <el-table-column label="子品类" width="220px">
      <template slot-scope="{row}">
        <Text-Button :text="getCat(row)" @handleClick="handleCategory(row)" style="display: inline;" />
      </template>
    </el-table-column>
    <el-table-column prop="salesCount" label="销量" align="right" min-width="60">
      <template #header>
        <Table-Sort-Button
          title="销量"
          sortVal="sales"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.sales | format}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="90px">
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
    <el-table-column align="right" min-width="50px">
      <template #header>
        <Table-Sort-Button
          title="销量环比"
          sortVal="salesRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.salesRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right" min-width="80px">
      <template #header>
        <Table-Sort-Button
          title="销售额环比"
          sortVal="gmvRate"
          :activedSortKey="activedSortKey"
          @handleSort="handleSort"/>
      </template>
      <template slot-scope="{row}">{{row.gmvRate | percentage}}</template>
    </el-table-column>
    <el-table-column align="right">
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
  </el-table>
</template>

<script>
import tableMixins from '@/views/brand/components/tableMixins.js'
import TextButton from '@/components/TextButton.vue'
// import { getTableForBrand } from '@/api/brand'
import { mapState } from 'vuex'
export default {
  name: 'TableForBrand',
  mixins: [tableMixins],
  props: {
    paramOfBrandTable: {
      type: Object,
      default: () => {}
    }
  },
  components: { TextButton },
  computed: {
    ...mapState('brand', ['brandList'])
  },
  methods: {
    getCat (data) {
      switch (data.remark) {
        case 'define':
          return data.outCat1
        case 1:
          return data.outCat1
        case 2:
          return data.outCat2
        case 3:
          return data.outCat3
        default:
          return ''
      }
    },
    // 携带点击的节点信息，打开新页面
    handleCategory (data) {
      const { href } = this.$router.resolve({
        path: '/brand',
        query: {
          id: data.id,
          brandList: JSON.stringify(this.brandList)
        }
      })
      window.open(href)
    },
    async load (tree, treeNode, resolve) {
      // const cateTableParam = { ...this.paramOfBrandTable }
      // const param = Object.assign(cateTableParam, { id: tree.id })
      // const res = await getTableForBrand(param)
      // if (res.code === 200) {
      //   resolve(res.result)
      // } else {
      //   this.$message.error('加载子分类失败')
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './table.styl'
</style>
