<template>
  <div>
    <div class="flex-row m-b-12">
      <i class="el-icon-star-on star-icon"></i>
      <div class="sum-title">手机号提取总条数:<span>{{phoneNumAcount | format}}</span></div>
      <div class="batch-form-wapper flex-row">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item >
            <span slot="label">批量筛选条件:<span style="display: inline-block; width: 15px"></span>最近到店</span>
            <el-select
              style="width: 120px"
              v-model="form.current"
              :disabled="tableSelection.length === 0"
              @change="changeBatch" >
              <el-option
                v-for="item in PORTRAIT_RANGE"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最少到店月数">
            <el-input
              v-model="form.min"
              style="width: 120px"
              :disabled="tableSelection.length === 0"
              @change="changeBatch"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
      header-row-class-name="tableHeaderClass"
      cell-class-name="tableCellClass"
      :data="tableData"
      @selection-change="tableSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="shopName"
        label="店铺名"
        width="250">
      </el-table-column>
      <el-table-column
        label="店铺总人数"
        width="100"
        align="right">
        <template slot-scope="{row}">
          <span>{{row.count | format}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="current"
        align="right"
        width="200">
        <template #header>
          <Table-Header-Tooltip label="最近到店" content="顾客到店时间范围"/>
        </template>
        <template slot-scope="{row, $index}">
          <el-select v-model="row.current" size="mini" style="width: 120px" @change="value => reloadData($index, row)">
            <el-option
              v-for="item in PORTRAIT_RANGE"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="min"
        align="right"
        width="225">
        <template #header>
          <Table-Header-Tooltip label="最少到店月数" content="最近到店时间范围内顾客最少到店月数值"/>
        </template>
        <template slot-scope="{row, $index}">
          <el-input
            v-model="row.min"
            size="mini"
            style="width: 120px"
            @change="value => reloadData($index, row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="180">
        <template #header>
          <Table-Header-Tooltip label="提取人数" content="根据店铺的筛选条件计算得出"/>
        </template>
        <template slot-scope="{row, $index}">
          <i class="el-icon-loading" v-if="loadingIndex === $index"></i>
          <span v-else>{{row.out | format}}</span>
        </template>
      </el-table-column>
      <el-table-column width="20px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MOCK_DATA, PORTRAIT_RANGE } from '@/utils/const.js'
import TableHeaderTooltip from '@/views/file/component/portrait/TableHeaderTooltip.vue'

export default {
  name: 'PartPhone',
  components: { TableHeaderTooltip },
  data () {
    return {
      phoneNumAcount: 2138128,
      form: {},
      tableSelection: [],
      tableData: MOCK_DATA,
      loadingIndex: -1,
      PORTRAIT_RANGE
    }
  },
  methods: {
    reloadData (index, rowData) {
      this.loadingIndex = index
      setTimeout(() => {
        rowData.out = rowData.out + 10
        this.tableData[index] = rowData
        this.loadingIndex = -1
      }, 1000)
    },
    tableSelectionChange (selection) {
      console.info(selection)
      this.tableSelection = selection
    },
    changeBatch () {
      this.tableSelection.forEach(item => {
        Object.assign(item, this.form)
      })
    }
  }
}
</script>

<style lang="stylus">
.flex-row
  display flex
  align-items center
.star-icon
  color #F3B71B
  font-size large
  margin-right 5px
  height 20px
  line-height 1
.sum-title
  color $color-title
  width 267px
  span
    font-weight bold
    font-size large
    display inline-block
    margin-left 5px
.batch-form-wapper
  padding 0px 12px
  .el-form-item
    margin-bottom 0
</style>
