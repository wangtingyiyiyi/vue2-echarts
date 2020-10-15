<template>
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
              :default-expand-all="true">
              <span slot-scope="{node, data}">
                <span class="custom-tree-node">
                  <el-tag v-if="data.remark === '1' || data.remark === 1" size="mini"  style="margin-right: 5px">一级</el-tag>
                  <el-tag v-else-if="data.remark === '2' || data.remark === 2" type="success" size="mini" style="margin-right: 5px">二级</el-tag>
                  <el-tag v-else-if="data.remark === '3' || data.remark === 3" type="warning" size="mini" style="margin-right: 5px">三级</el-tag>
                  <el-tag v-else type="danger" size="mini"  style="margin-right: 5px">自定义</el-tag>
                  <!-- <span class="tree-select-icon" v-if="data.remark === '1' || data.remark === 1" style="color: #5B8FF9;">{{data.remark}}</span>
                  <span class="tree-select-icon" v-else-if="data.remark === '2' || data.remark === 2" style="color: #5AD8A6;">{{data.remark}}</span>
                  <span class="tree-select-icon" v-else-if="data.remark === '3' || data.remark === 3" style="color: #5D7092;">{{data.remark}}</span>
                  <span class="tree-select-icon" v-else style="color: #5B8FF9;">自</span> -->
                  <span v-html="highlight(likeCondition, data.label)"></span>
                </span>
              </span>
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
              @current-change="handleNodeClick"
              :load="loadNode">
              <span slot-scope="{node, data}">
                <span class="custom-tree-node">
                  <!-- <span class="tree-select-icon" v-if="data.remark === '1' || data.remark === 1" style="color: #5B8FF9;">{{data.remark}}</span>
                  <span class="tree-select-icon" v-else-if="data.remark === '2' || data.remark === 2" style="color: #5AD8A6;">{{data.remark}}</span>
                  <span class="tree-select-icon" v-else-if="data.remark === '3' || data.remark === 3" style="color: #5D7092;">{{data.remark}}</span>
                  <span class="tree-select-icon" v-else style="color: #5B8FF9;">自</span> -->
                  <el-tag v-if="data.remark === '1' || data.remark === 1" size="mini" style="margin-right: 5px">一级</el-tag>
                  <el-tag v-else-if="data.remark === '2' || data.remark === 2" type="success" size="mini" style="margin-right: 5px">二级</el-tag>
                  <el-tag v-else-if="data.remark === '3' || data.remark === 3" type="warning" size="mini" style="margin-right: 5px">三级</el-tag>
                  <el-tag v-else type="danger" size="mini" style="margin-right: 5px">自定义</el-tag>
                  <span>{{data.label}}</span>
                </span>
              </span>
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
      showExpandTree: false,
      leftTreeProps: {
        isLeaf: 'isLeaf',
        children: 'childList',
        disabled: this.disabledFn
      },
      rootTree: [],
      likeCondition: ''
    }
  },
  computed: {
    ...mapState('industry', ['categoryObj'])
  },
  methods: {
    ...mapMutations('industry', ['SET_INDUSTRY_CATEGORY']),
    handleFilter () {
      this.$emit('handleFilter', true)
    },
    handleExportDialog () {
      this.$emit('handleExportDialog')
    },
    highlight (keyWord, label) {
      const mes = label.replace(new RegExp(`(${keyWord})`, 'gi'), "<span style='background: background: rgba(255, 214, 0, 0.4); font-weight: inherit'>$1</span>")
      return '<span style="font-weight: inherit">' + mes + '</span>'
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
      this.likeCondition = query
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
