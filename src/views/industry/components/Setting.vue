<template>
  <div>
    <div class="industry-setting-wapper">
      <el-form class="m-t-20" inline label-position="left" label-width="70px" ref="industryForm">
        <el-form-item prop="brandId">
          <span slot="label" class="form-label">选择行业</span>
          <el-select
            ref="select"
            :value="categoryObj.label"
            filterable
            remote
            placeholder="请输入搜索品类"
            style="width: 600px"
            @clear="handleClean"
            :remote-method="handleSelctRemoteFilter">
            <el-option value="0" class="hidden"></el-option>
              <!-- 搜索树 -->
              <el-tree
                ref="tree"
                v-show="showExpandTree"
                :data="options"
                node-key="key"
                class="select-tree"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                :render-content="renderContent"
                :props="defaultProps">
              </el-tree>
              <!-- 异步请求树 -->
              <el-tree
                v-show="!showExpandTree"
                :props="leftTreeProps"
                node-key="id"
                :data="rootTree"
                highlight-current
                check-on-click-node
                ref="leftTree1"
                lazy
                class="select-tree"
                :render-content="renderContent"
                @current-change="handleNodeClick"
                :load="loadNode">
              </el-tree>
            </el-select>
        </el-form-item>
        <el-form-item>
          <div style="display: flex">
            <Text-Button text="高级筛选" @handleClick="handleFilter" class="p-0-15 font-size-14 m-l-5" />
            <Text-Button text="行业提数" @handleClick="handleExportDialog" class="p-0-15 font-size-14" />
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import { getIndustryCategory, getCategoryTree } from '@/api/industry'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'IndustrySetting',
  components: { TextButton },
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
      },
      showExpandTree: false,
      leftTreeProps: {
        isLeaf: 'isLeaf',
        children: 'childList',
        disabled: this.disabledFn
      },
      rootTree: []
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
    handleExportDialog () {
      this.$emit('handleExportDialog')
    },
    handleNodeClick (data, node, ref) {
      this.selectData.remark = data.remark
      this.selectData.id = data.id
      this.selectData.label = data.label
      this.SET_INDUSTRY_CATEGORY(this.selectData)
      this.$refs.select.blur()
      this.$emit('brandOnSubmit', this.selectData)
    },
    handleClean () {
      this.showExpandTree = false
    },
    async handleSelctRemoteFilter (query) {
      if (query) {
        this.showExpandTree = true
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
        this.showExpandTree = false
        this.options = []
      }
    },
    handleChangeCurrent (data, node) {
      console.info(data, node)
    },
    // render 函数渲染 tree 节点样式
    renderContent (h, { node, data, store }) {
      // "<span style='background: #ffeb3b; font-weight: inherit'>$1</span>"
      // const likeCondition = 'cdbbdbsbz'
      // const myRe = /d(b+)d/g
      // console.info(myRe.exec(likeCondition))
      // const rep = <span style='background: #ffeb3b; font-weight: inherit'>$1</span>
      // const st = <span style="font-weight: inherit;background: #ffeb3b;">{rep}</span>
      if (node.data.remark === '1' || node.data.remark === 1) {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5B8FF9;">{node.data.remark}</span>
            <span>{node.label}</span>
          </span>)
      } else if (node.data.remark === '2' || node.data.remark === 2) {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5AD8A6;">{node.data.remark}</span>
            <span>{node.label}</span>
          </span>)
      } else if (node.data.remark === '3' || node.data.remark === 3) {
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
    },
    async getCat1 () {
      const res = await getCategoryTree()
      if (res.code === 200) {
        this.options = res.result
        this.options.forEach(item => {
          item.label = item.outCat1
        })
      }
    },
    async getCategoryTree (param = {}) {
      // 去掉value为空字符串的键值对
      const keys = Object.keys(param)
      keys.forEach(k => {
        if (!param[k]) {
          delete param[k]
        }
      })
      const res = await getCategoryTree(param)
      if (res.code === 200) {
        res.result.forEach(item => {
          item.isLeaf = !item.hasChild
        })
        return res.result
      }
    },
    loadNode (node = {}, resolve) {
      if (node.level === 0) {
        this.getCategoryTree().then((res) => {
          this.rootTree = res
          resolve(res)
        })
      } else {
        this.getCategoryTree(node.data).then((res) => {
          resolve(res)
        })
      }
    }
  },
  mounted () {
    // this.getCat1()
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
