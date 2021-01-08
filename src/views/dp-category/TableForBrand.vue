<template>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="排名">
      </el-table-column>
      <el-table-column
        label="品牌">
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
        label="热榜率">
      </el-table-column>
      <el-table-column
        label="商场店">
      </el-table-column>
      <el-table-column
        label="平均分">
      </el-table-column>
      <el-table-column
        label="标准差">
      </el-table-column>
      <el-table-column
        label="好评率">
      </el-table-column>
      <el-table-column
        label="均价">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'TableForBrand',
  data () {
    return {
      tableData: []
    }
  }
}
</script>
