<template>
  <div>
    <div class="industry-setting-wapper">
      <el-form class="m-t-20" inline label-position="left" label-width="70px" ref="industryForm">
        <el-form-item prop="brandId">
          <span slot="label" class="form-label">目标品类</span>
          <el-select
            ref="select"
            :value="categoryObj.label"
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
                :empty-text="getEmptyText()"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                :render-content="renderContent"
                :props="defaultProps">
              </el-tree>
            </el-select>
        </el-form-item>
        <el-form-item>
          <div style="display: flex">
            <!-- <el-button type="primary" class="m-l-24" @click="onSubmit">查询</el-button> -->
            <Text-Button text="高级筛选" @handleClick="handleFilter" class="p-0-15 font-size-14 m-l-5" />
            <Text-Button text="行业提数" @handleClick="handleExport" class="p-0-15 font-size-14" />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <Dialog-For-Industry-Export
      :dialogVisible="dialogVisible"
      v-if="dialogVisible"
      @closeDialog="dialogVisible = $event"/>
  </div>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import DialogForIndustryExport from '@/views/industry/components/DialogForIndustryExport.vue'
import { getIndustryCategory } from '@/api/industry'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'IndustrySetting',
  components: { TextButton, DialogForIndustryExport },
  data () {
    return {
      dialogVisible: false,
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
  methods: {
    ...mapMutations('industry', ['SET_INDUSTRY_CATEGORY']),
    getEmptyText () {
      const query = this.$refs?.select?.query || ''
      return (query === '' && this.options.length === 0) ? '请输入关键字' : '暂无匹配数据'
    },
    handleFilter () {
      this.$emit('handleFilter', true)
    },
    handleExport () {
      this.dialogVisible = true
    },
    onSubmit () {
      this.$emit('brandOnSubmit', this.selectData)
    },
    handleNodeClick (data, node, ref) {
      this.selectData.remark = data.remark
      this.selectData.id = data.id
      this.selectData.label = data.label
      this.SET_INDUSTRY_CATEGORY(this.selectData)
      this.$refs.select.blur()
      this.$emit('brandOnSubmit', this.selectData)
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
  >>> .form-label
    font-weight 500
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
