<template>
  <div>
      <el-button
        class="el-button--dashed"
        style="padding: 7px 25px; margin-bottom: 5px"
        @click="handleAddRules">增加规则</el-button>
      <el-button
        type="primary"
        style="padding: 7px 25px; margin-bottom: 5px"
        @click="handleCheckRules">确认规则</el-button>
      <Case/>
    <el-table
      header-row-class-name="tableHeaderClass"
      cell-class-name="tableCellClass"
      empty-text="请添加规则"
      ref="table"
      :data="rulesList"
      height="400"
      style="min-height: 248px; margin: 20px 0; max-width: 1138px">
      <el-table-column
        type="index"
        width="50">
        <template slot-scope="{row, $index}">{{rulesList.length - $index}}</template>
      </el-table-column>
      <el-table-column
        width="180">
        <template #header>
          <Table-Header-Tooltip label="关键词" content="一般为品牌的中文名或者英文名"/>
        </template>
        <template slot-scope="{row, $index}">
          <Dynamic-Tags
            :value="row.keyword"
            :index="$index"
            k="keyword"
            @handlePushKeyWord="handlePushKeyWord"
            @handleCloseKeyWord="handleCloseKeyWord"/>
        </template>
      </el-table-column>
      <el-table-column
        width="200">
        <template #header>
          <Table-Header-Tooltip label="关联关键词" content="可以为关键词的联名品牌,相关品类等与关键词相关的词语"/>
        </template>
        <template slot-scope="{row, $index}">
          <Dynamic-Tags
            :value="row.inKeyword"
            :index="$index"
            k="inKeyword"
            @handlePushKeyWord="handlePushKeyWord"
            @handleCloseKeyWord="handleCloseKeyWord"/>
        </template>
      </el-table-column>
      <el-table-column
        width="200">
        <template #header>
          <Table-Header-Tooltip label="排除词" content="在满足关键词或关联关键词的情况下,需要排除的一些关键字"/>
        </template>
        <template slot-scope="{row, $index}">
          <Dynamic-Tags
            :value="row.exKeyword"
            :index="$index"
            k="exKeyword"
            @handlePushKeyWord="handlePushKeyWord"
            @handleCloseKeyWord="handleCloseKeyWord"/>
        </template>
      </el-table-column>
      <el-table-column
        label="规则说明">
        <template slot-scope="{row}">
          <span v-html="setRulesStatement(row)"></span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        label="操作">
        <template slot-scope="{row, $index}">
          <el-button type="text" size="mini"  @click="handleRemove($index)">
            <i class="el-icon-remove-outline font-size-14"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TableHeaderTooltip from '@/views/file/component/portrait/TableHeaderTooltip.vue'
import DynamicTags from '@/views/file/component/xiaohongshu/DynamicTags.vue'
import Case from '@/views/file/component/xiaohongshu/Case.vue'
import { setRulesStatementAboutXHS } from '@/utils/common.js'

export default {
  name: 'ShopTags',
  components: { TableHeaderTooltip, DynamicTags, Case },
  data () {
    return {
      showCase: false,
      rulesList: []
    }
  },
  methods: {
    setRulesStatement: setRulesStatementAboutXHS,
    handleAddRules () {
      this.rulesList.unshift({ brand: '', keyword: [], inKeyword: [], exKeyword: [] })
    },
    handlePushKeyWord (index, key, value) {
      this.rulesList[index][key].push(value)
    },
    handleCloseKeyWord (index, key, i) {
      this.rulesList[index][key].splice(i, 1)
    },
    handleCheckRules () {
      this.$emit('handleCheckRules', this.rulesList)
    },
    handleRemove (index) {
      this.rulesList.splice(index, 1)
    }
  }
}
</script>
