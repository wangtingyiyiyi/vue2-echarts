
<template>
  <el-table
    :data="tableData"
    ref="table"
    style="width: 100%">
    <el-table-column
      prop="category"
      label="子品类"
      width="180">
    </el-table-column>
    <el-table-column
      prop="salesCount"
      label="销量"
      width="180">
    </el-table-column>
    <el-table-column
      prop="salesAmount"
      label="销售额">
    </el-table-column>
    <el-table-column
      label="销售趋势">
      <template>
        <span>echarts</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="salesCountAcc"
      label="销售环比">
    </el-table-column>
    <el-table-column
      prop="gmvAcc"
      label="销售环比">
    </el-table-column>
    <el-table-column
      prop="spu"
      label="SPU数">
    </el-table-column>
    <el-table-column
      prop="price"
      label="均价">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TabBrandTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
