<template>
  <div class="industry-setting-wapper">
    配置筛选
    <el-form class="m-t-20" inline  label-position="left" label-width="70px" ref="industryForm">
      <el-form-item label="目标品类" prop="brandId">
         <el-select
          ref="select"
          v-model="selectLabel"
          filterable
          remote
          placeholder="请输入搜索品类"
          style="width: 600px"
          :remote-method="handleSelctRemoteFilter">
          <el-option value="0" class="hidden"></el-option>
            <el-tree
              ref="tree"
              :data="options"
              node-key="key"
              class="select-tree"
              @node-click="handleNodeClick"
              :default-expand-all="true"
              :render-content="renderContent"
              :props="defaultProps">
            </el-tree>
          </el-select>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <el-button type="primary" class="m-l-24" @click="onSubmit">查询</el-button>
          <Text-Button text="高级筛选" @handleClick="handleFilter" class="p-0-15 font-size-13" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import { mockTreeData } from '@/mock'
import { getIndustryCategory } from '@/api/industry'
export default {
  name: 'IndustrySetting',
  components: { TextButton },
  data () {
    return {
      dialogVisible: false,
      selectLabel: '',
      selectData: {
        remark: '',
        id: '',
        label: ''
      },
      options: [],
      mockTreeData: mockTreeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleFilter () {
      this.$emit('handleFilter', true)
    },
    onSubmit () {
      this.$emit('brandOnSubmit', this.selectData)
    },
    handleNodeClick (data, node, ref) {
      this.selectLabel = data.label
      this.selectData.remark = data.remark
      this.selectData.id = data.id
      this.selectData.label = data.label
      this.$refs.select.blur()
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
.industry-setting-wapper
  background-color #ffffff
  padding 20px 26px

.industry-tree
  width 400px
  & >>> .vue-treeselect__control
    border-radius 0px
    height 32px

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
