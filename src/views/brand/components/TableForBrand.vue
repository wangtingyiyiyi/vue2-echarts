
<template>
  <el-table
    :data="tableData"
    header-row-class-name="tableHeaderClass"
    cell-class-name="tableCellClass"
    ref="table"
    stripe
    style="width: 100%"
    lazy
    row-key="id"
    :load="load">
    <el-table-column label="子品类" width="180">
      <template slot-scope="{row}">
        <Text-Button :text="getCat(row)" @handleClick="handleCategory(row)" style="display: inline;" />
      </template>
    </el-table-column>
    <el-table-column
      prop="salesCount"
      label="销量"
      align="right"
      width="180">
      <template #header>
        <div class="sort-button"  @click="handleSort('0')">销量
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '0' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.sumSales | format}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('1')">销售额
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '1' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">¥{{row.sumGmv | format}}</template>
    </el-table-column>
    <el-table-column width="40"></el-table-column>
    <el-table-column
      align="center"
      label="销售趋势">
      <template slot-scope="{row}">
        <Line-In-Table :seriesData="row.gmvBeanList" :xAxisData="row.monthBeanList"/>
      </template>
    </el-table-column>
    <el-table-column align="center">
      <template #header>
        <div class="sort-button"  @click="handleSort('2')">销量环比
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '2' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.salesSequential | percentage}}</template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="sort-button"  @click="handleSort('3')">销售额环比
          <Svg-Icon icon-class="descending" :class="[sortItemVal == '3' ? 'active-sort' : '']"/>
        </div>
      </template>
      <template slot-scope="{row}">{{row.gmvSequential | percentage}}</template>
    </el-table-column>
    <el-table-column
      align="right"
      label="均价">
      <template slot-scope="{row}">¥{{row.avgPrice | format}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import tableMixins from '@/views/brand/components/tableMixins.js'
import TextButton from '@/components/TextButton.vue'
import { getTableForBrand } from '@/api/brand'
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
      // console.info(data, this.brandList)
      // const { href } = this.$router.resolve({
      //   path: '/brand',
      //   query: {
      //     id: data.id,
      //     label: this.getCat(data),
      //     remark: data.remark,
      //     brandList: JSON.stringify(this.brandList)
      //   }
      // })
      // window.open(href)
    },
    async load (tree, treeNode, resolve) {
      const cateTableParam = { ...this.paramOfBrandTable }
      const param = Object.assign(cateTableParam, { id: tree.id })
      const res = await getTableForBrand(param)
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
.sort-button
  cursor pointer

.active-sort
  color $base-blue

</style>
