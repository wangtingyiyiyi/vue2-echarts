<template>
<div>
  <el-select
    ref="select"
    :value="selectData.label"
    filterable
    remote
    placeholder="请输入搜索品类"
    style="width: 100%"
    :remote-method="handleSelctRemoteFilter">
    <el-option value="0" class="hidden"></el-option>
      <el-tree
        ref="tree"
        :data="options"
        node-key="key"
        class="select-tree"
        :empty-text="getEmptyText()"
        @node-click="handleNodeClick"
        :default-expand-all="true"
        :props="defaultProps">
        <span slot-scope="{node, data}">
          <span class="custom-tree-node">
            <span class="tree-select-icon" v-if="data.rank === '1' || data.rank === 1" style="color: #5B8FF9;">{{data.rank}}</span>
            <span class="tree-select-icon" v-else-if="data.rank === '2' || data.rank === 2" style="color: #5AD8A6;">{{data.rank}}</span>
            <span class="tree-select-icon" v-else-if="data.rank === '3' || data.rank === 3" style="color: #5D7092;">{{data.rank}}</span>
            <span class="tree-select-icon" v-else style="color: #5B8FF9;">自</span>
            <span>{{data.label}}</span>
          </span>
        </span>
      </el-tree>
  </el-select>
</div>
</template>

<script>
import { getIndustryCategory } from '@/api/industry'
import { mapState } from 'vuex'
export default {
  name: 'SelectTree',
  data () {
    return {
      selectData: {},
      options: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }

    }
  },
  computed: {
    ...mapState('industry', ['categoryObj'])
  },
  methods: {
    getEmptyText () {
      const query = this.$refs?.select?.query || ''
      return (query === '' && this.options.length === 0) ? '请输入关键字' : '暂无匹配数据'
    },
    handleNodeClick (data, node, ref) {
      this.selectData = data
      this.$refs.select.blur()
      this.$emit('handleSelectTree', this.selectData)
    },
    async handleSelctRemoteFilter (query) {
      if (query) {
        const res = await getIndustryCategory({ likeCondition: query })
        if (res.code === 200) {
          // 移除自定义下children数组, 目的在于不显示自定义的子分类
          res.result.forEach(element => {
            if (element.rank === 'define') {
              delete element.children
            }
          })
          this.options = res.result
        } else {
          this.$message.error('行业品类请求失败')
        }
      } else {
        this.options = []
      }
    },
    setSelectData () {
      this.selectData = this.categoryObj
      this.$emit('handleSelectTree', this.selectData)
      this.handleSelctRemoteFilter(this.selectData.label)
    }
  },
  mounted () {
    this.setSelectData()
  }
}
</script>

<style lang="stylus" scoped>
.el-select-dropdown
  .hidden
    display: none

.select-tree >>> .tree-select-icon
  display inline-block
  margin-right 10px
  font-size 12px
  width 14px
  height 14px
  line-height 14px
  text-align center
  border-radius 10px
  background-color $base-white
</style>
