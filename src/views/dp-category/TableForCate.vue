<template>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="子品类">
      </el-table-column>
      <el-table-column
        label="现有店铺">
      </el-table-column>
      <el-table-column
        label="本期新开">
      </el-table-column>
      <el-table-column
        label="本期关店">
      </el-table-column>
      <el-table-column
        label="店铺趋势">
      </el-table-column>
      <el-table-column
        label="增速环比">
      </el-table-column>
      <el-table-column
        label="增速同比">
      </el-table-column>
      <el-table-column
        label="均价">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'TableForCate',
  data () {
    return {
      tableData: []
    }
  }
}
</script>
