<template>
  <el-select
      v-model="dataArr"
      filterable
      multiple
      remote
      placeholder="请输入搜索品类"
      style="width: 600px"
      @remove-tag="handleTagChange"
      :remote-method="handleSelctRemoteFilter"
      @visible-change="handleOptionHidden"
      class="hi-input">
      <el-option value="0" class="hidden"></el-option>
      <!--el-tree绑定的数组中children里的key值不能是0-->
      <el-tree
          ref="tree"
          :data="options"
          node-key="key"
          :default-checked-keys="selectedData"
          @node-click="handleNodeClick"
          :default-expand-all="true"
          :render-content="renderContent"
          :props="defaultProps">
      </el-tree>
  </el-select>
</template>

<script>
import { mockTreeData } from '@/mock'

export default {
  data () {
    return {
      dataArr: [],
      options: [],
      mockTreeData: mockTreeData,
      selectedData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    selectedData: function (newValue) {
      this.$nextTick(() => { this.dataArr = this.handleDataTransform(newValue, 'key', 'label') })
    }
  },
  methods: {
    handleNodeClick (data, node, ref) {
      console.info(data, node, ref)
    },
    handleSelctRemoteFilter (query) {
      // this.options = this.mockTreeData
      if (query) {
        // api 请求
        this.options = this.mockTreeData
      } else {
        this.options = []
      }
    },
    getNameById (array, value, id, name, multi) {
      const arr = array || []
      let flag
      const result = arr.filter(item => {
        return item[id] + '' === value + ''
      })
      if (multi) {
        flag = result.map(item => {
          return item[name]
        })
      } else {
        const obj = result[0]
        flag = name ? obj && obj[name] : obj
      }
      return flag
    },
    handleDataTransform: function (source, key, value) {
      return this.options.map(_ => {
        const arr = source.map(item => this.getNameById(_.children, item, key, value)).filter(item => item)
        return arr
      }).reduce((acc, cur) => {
        return acc.concat(cur)
      }, [])
    },
    handleTagChange: function () {
    //  handleDataTransform已经在之前定义过
      this.selectedData = this.handleDataTransform(this.dataArr, 'label', 'key')
      this.$refs.tree.setCheckedKeys(this.selectedData)
    },
    handleOptionHidden: function (item) {
    // 处理选中内容没变的情况
      // if (item) {
      //   this.selectedItem = [...this.selectedData]
      // } else {
      //   //  this.$util.isEqual()是判断两个数组是否相等函数，网上很多，请自行谷歌
      //   if (!this.$util.isEqual(this.selectedItem, this.selectedData)) {
      //     this.handleUpdate(this.selectedData)
      //   }
      // }
    },
    renderContent (h, { node, data, store }) {
      console.info(node)
      return (
        <span class="custom-tree-node">
          <span style="display: inline-block; margin-right: 10px; color: blue">{node.data.remark}</span>
          <span>{node.label}</span>
        </span>)
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-select-dropdown
  .hidden
    display: none
</style>
