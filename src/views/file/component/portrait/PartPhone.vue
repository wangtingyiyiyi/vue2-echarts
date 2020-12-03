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
              v-model="form.range"
              :disabled="tableSelection.length === 0"
              @change="changeBatch" >
              <el-option
                v-for="item in PORTRAIT_RANGE"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最小到店月数">
            <el-input
              v-model="form.minCount"
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
        prop="shopname"
        label="店铺名"
        width="250">
      </el-table-column>
      <el-table-column
        label="店铺总人数"
        width="100"
        align="right">
        <template slot-scope="{row}">
          <span>{{row.total | format}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="200">
        <template #header>
          <Table-Header-Tooltip label="最近到店" content="顾客到店时间范围"/>
        </template>
        <template slot-scope="{row, $index}">
          <el-select v-model="row.range" size="mini" style="width: 120px" @change="value => reloadData($index, row)">
            <el-option
              v-for="item in PORTRAIT_RANGE"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="225">
        <template #header>
          <Table-Header-Tooltip label="最小到店月数" content="最近到店时间范围内顾客最小到店月数值"/>
        </template>
        <template slot-scope="{row, $index}">
          <el-input
            v-model="row.minCount"
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
          <span v-else>{{row.cn | format}}</span>
        </template>
      </el-table-column>
      <el-table-column width="20px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { PORTRAIT_RANGE } from '@/utils/const.js'
import TableHeaderTooltip from '@/views/file/component/portrait/TableHeaderTooltip.vue'
import { getShopPerson } from '@/api/shop.js'

export default {
  name: 'Phone',
  components: { TableHeaderTooltip },
  props: {
    shopList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    shopList: {
      deep: true,
      handler: function (params) {
        this.getShopPerson(params).then((res) => {
          this.tableData = res
        })
      }
    }
  },
  data () {
    return {
      phoneNumAcount: 2138128,
      form: {
        range: '0',
        minCount: 1
      },
      tableSelection: [],
      loadingIndex: -1,
      PORTRAIT_RANGE,
      tableData: []
    }
  },
  methods: {
    reloadData (index, rowData) {
      this.loadingIndex = index
      this.getShopPerson([rowData]).then((res) => {
        this.tableData[index] = res
        this.loadingIndex = -1
      })
    },
    tableSelectionChange (selection) {
      this.tableSelection = selection
    },
    changeBatch () {
      this.tableSelection.forEach(item => { Object.assign(item, this.form) })
      this.getShopPerson(this.tableSelection).then((res) => {
        this.tableData = res
      })
    },
    async getShopPerson (params) {
      const res = await getShopPerson({ shopList: params })
      if (res.code === 200) {
        return res.result
      }
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
