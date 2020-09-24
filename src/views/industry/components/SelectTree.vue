<template>
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
        :render-content="renderContent"
        :props="defaultProps">
      </el-tree>
  </el-select>
</template>

<script>
import { getIndustryCategory } from '@/api/industry'
import { mapState } from 'vuex'
export default {
  name: 'SelectTree',
  data () {
    return {
      selectData: {
        remark: '',
        id: '',
        label: ''
      },
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
  watch: {
    categoryObj: {
      deep: true,
      handler: function (params) {
        this.selectData = JSON.parse(JSON.stringify(params))
      }
    }
  },
  methods: {
    getEmptyText () {
      const query = this.$refs?.select?.query || ''
      return (query === '' && this.options.length === 0) ? '请输入关键字' : '暂无匹配数据'
    },
    handleNodeClick (data, node, ref) {
      this.selectData.remark = data.remark
      this.selectData.id = data.id
      this.selectData.label = data.label
      this.$refs.select.blur()
      this.$emit('handleSelectTree', this.selectData)
    },
    async handleSelctRemoteFilter (query) {
      if (query) {
        const res = await getIndustryCategory({ likeCondition: query })
        if (res.code === 200) {
          // 移除自定义下children数组, 目的在于不显示自定义的子分类
          res.result.forEach(element => {
            if (element.remark === 'define') {
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
    // render 函数渲染 tree 节点样式
    renderContent (h, { node, data, store }) {
      if (node.data.remark === '1') {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5B8FF9;">{node.data.remark}</span>
            <span>{node.label}</span>
          </span>)
      } else if (node.data.remark === '2') {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5AD8A6;">{node.data.remark}</span>
            <span>{node.label}</span>
          </span>)
      } else if (node.data.remark === '3') {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5D7092;">{node.data.remark}</span>
            <span>{node.label}</span>
          </span>)
      } else {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5B8FF9;">自</span>
            <span>{node.label}</span>
          </span>)
      }
    }
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
