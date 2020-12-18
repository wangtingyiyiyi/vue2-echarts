<template>
  <el-popover
    placement="top-start"
    width="1138"
    trigger="hover">
    <span class="text-second font-size-14 m-l-20" slot="reference">
      <i class="el-icon-s-opportunity"></i> 示例 </span>
    <el-table
      header-row-class-name="tableHeaderClass"
      cell-class-name="tableCellClass"
      empty-text="请添加规则"
      ref="table"
      :data="caseTable"
      style="margin-bottom: 20px;">
      <el-table-column
        width="220"
        prop="keyword">
        <template #header>
          <Table-Header-Tooltip label="关键词" content="一般为品牌的中文名或者英文名"/>
        </template>
        <template slot-scope="{row}">
          <div v-for="item in row.keyword" :key="item"><el-tag type="info" class="m-b-5">{{item}}</el-tag></div>
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        prop="inKeyword">
        <template #header>
          <Table-Header-Tooltip label="关联关键词" content="可以为关键词的联名品牌,相关品类等与关键词相关的词语"/>
        </template>
        <template slot-scope="{row}">
          <div v-for="item in row.inKeyword" :key="item"><el-tag type="info">{{item}}</el-tag></div>
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        prop="exKeyword">
        <template #header>
          <Table-Header-Tooltip label="排除词" content="在满足关键词或关联关键词的情况下,需要排除的一些关键字"/>
        </template>
        <template slot-scope="{row}">
          <div v-for="item in row.exKeyword" :key="item"><el-tag type="info">{{item}}</el-tag></div>
        </template>
      </el-table-column>
      <el-table-column
        label="规则说明">
        <template slot-scope="{row}">
          <span v-html="setRulesStatement(row)"></span>
        </template>
      </el-table-column>
    </el-table>
  </el-popover>
</template>

<script>
import TableHeaderTooltip from '@/views/file/component/portrait/TableHeaderTooltip.vue'
import { setRulesStatementAboutXHS } from '@/utils/common.js'
export default {
  name: 'Case',
  components: { TableHeaderTooltip },
  data () {
    return {
      showCase: false,
      caseTable: [
        {
          keyword: ['完美日记', 'PERFECT DIARY'],
          inKeyword: ['粉底'],
          exKeyword: []
        }, {
          keyword: ['花西子'],
          inKeyword: ['粉底'],
          exKeyword: ['苗族印象']
        }
      ]
    }
  },
  methods: {
    setRulesStatement: setRulesStatementAboutXHS
  }
}
</script>
