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
      <!-- 搜索树 -->
      <el-tree
        v-show="showExpandTree"
        ref="tree"
        :data="searchTree"
        node-key="key"
        class="select-tree"
        @node-click="handleNodeClick"
        :default-expand-all="true">
        <IndustrySelectTreeLabel slot-scope="{data}" :data="data" :likeCondition="likeCondition"/>
      </el-tree>
      <!-- 异步请求树 -->
      <el-tree
        v-show="!showExpandTree"
        lazy
        ref="leftTree1"
        node-key="label"
        class="select-tree"
        highlight-current
        check-on-click-node
        :data="asyncTree"
        :props="{ isLeaf: 'isLeaf' }"
        :expand-on-click-node="false"
        :load="loadNode"
        @node-click="handleNodeClick">
        <IndustrySelectTreeLabel slot-scope="{data}" :data="data" label="category"/>
      </el-tree>
  </el-select>
</template>

<script>
import { getIndustryCategory, getCategoryTree } from '@/api/industry'
import IndustrySelectTreeLabel from '@/views/industry/components/IndustrySelectTreeLable.vue'
export default {
  name: 'SelectTree',
  components: { IndustrySelectTreeLabel },
  props: {
    defaultObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showExpandTree: false,
      likeCondition: '',
      selectData: {},
      searchTree: [],
      asyncTree: []
    }
  },
  watch: {
    defaultObj: {
      deep: true,
      handler: function (params) {
        this.selectData = this.defaultObj
      }
    }
  },
  mounted () {
    this.selectData = this.defaultObj
  },
  methods: {
    handleNodeClick (data, node, ref) {
      this.selectData = data
      this.selectData.label = data.label.split('&&')[0]
      this.$refs.select.blur()
      this.$emit('handleSelectTree', Object.assign(this._.cloneDeep(this.selectData), { children: null }))
    },
    // 异步搜索
    async handleSelctRemoteFilter (query) {
      this.likeCondition = query
      if (query) {
        this.showExpandTree = true
        const res = await getIndustryCategory({ likeCondition: query })
        if (res.code === 200) {
          // 移除自定义下children数组, 目的在于不显示自定义的子分类
          res.result.forEach(element => {
            if (element.rank === 0) {
              delete element.children
            }
          })
          this.searchTree = res.result
        } else {
          this.$message.error('行业品类请求失败')
        }
      } else {
        this.showExpandTree = false
        this.searchTree = []
      }
    },
    // 加载node
    loadNode (node = {}, resolve) {
      if (node.level === 0) {
        this.getCategoryTree({}).then((res) => {
          this.asyncTree = res
          resolve(res)
        })
      } else {
        this.getCategoryTree(node.data).then((res) => {
          resolve(res)
        })
      }
    },
    // 根据rank,获取子节点
    async getCategoryTree (param) {
      if (param.rank !== 3) {
        const res = await getCategoryTree(param)
        if (res.code === 200) {
          return res.result
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-select-dropdown
  .hidden
    display: none
</style>
