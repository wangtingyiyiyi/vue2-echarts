<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    class="indusrty-select-dialog"
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="10vh"
    width="800px">
    <div slot="title">品类搜索</div>

    <div class="tree-transfer">
      <div class="transfer-left">
        <div class="header">
          <el-input v-model="likeCondition" placeholder="请输入关键字，回车搜索" @keydown.enter.native="handleFilter"></el-input>
        </div>
        <el-checkbox v-model="checkAll" class="m-l-16 check-all">全选</el-checkbox>
        <el-tree
          :data="leftTree"
          :props="{ isLeaf: 'isLeaf', children: 'children' }"
          show-checkbox
          node-key="id"
          ref="leftTree"
          lazy
          class="tree-wapper beauty-scroll"
          :render-content="renderContent"
          :load="loadNode"
          @check="leftHandleCheck">
        </el-tree>
      </div>
      <div class="transfer-center">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          @click="goRight"></el-button>
        <el-button type="primary" icon="el-icon-arrow-left" disabled @click="goLeft"></el-button>
        <el-button type="primary" icon="el-icon-d-arrow-left" disabled @click="allGoLeft"></el-button>
      </div>
      <div class="transfer-right">
        <div class="header">已选中品类项</div>
        <!-- :render-content="renderContent" -->
        {{leftTree}}
        <el-tree
          :data="rightTree"
          :props="{ isLeaf: 'isLeaf', children: 'children' }"
          :default-expand-all="true"
          class="tree-wapper beauty-scroll">
        </el-tree>
      </div>
    </div>

    <el-form inline class="m-t-24" :model="form">
      <el-form-item label="自定义标签名称" prop="category" :rules="{ required: true, message: '请输入自定义品类标签名'}">
        <el-input placeholder="保存选中对比品类标签" v-model="form.category" style="width: 215px"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit" disabled>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCategoryTree } from '@/api/industry'
export default {
  name: 'DialogForIndustryDefine',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      likeCondition: '',
      checkAll: false,
      form: {},
      leftTree: [],
      rightTree: [],
      resTree: [],
      tempTree: [],
      selectTreeId: [],
      isFilterRes: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    onCancel () {
      this.closeDialog()
    },
    onSubmit () {
      this.closeDialog()
    },
    leftHandleCheck (data, node) {
      this.selectTreeId = node.checkedKeys
    },
    // 设置tree节点显示label
    getTreeLabel (data) {
      const k = `outCat${data.remark}`
      return data[k]
    },
    // tree 节点渲染函数
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{this.getTreeLabel(data)}</span>
        </span>)
    },
    // 异步加载
    loadNode (node, resolve) {
      if (node.level === 0) {
        this.getCategoryTree().then((res) => {
          this.leftTree = JSON.parse(JSON.stringify(res))
          this.tempTree = JSON.parse(JSON.stringify(res))
          this.tempTree.forEach(item => {
            if (item.hasChild) {
              item.children = []
              return item
            }
          })
        })
      } else if (node.level === 1) {
        this.getCategoryTree(node.data)
          .then((res) => {
            resolve(res)
            this.tempTree.forEach(item => {
              if (item.outCat1 === node.data.outCat1) {
                res.forEach(r => {
                  if (r.hasChild) {
                    r.children = []
                    return r
                  }
                })
                item.children.push(...res)
                return item
              }
            })
          })
      } else if (node.level === 2) {
        this.getCategoryTree(node.data)
          .then((res) => {
            resolve(res)
            this.tempTree.forEach(item => {
              if (item.outCat1 === node.data.outCat1) {
                item.children.forEach(i => {
                  if (i.outCat2 === node.data.outCat2) {
                    i.children.push(...res)
                  }
                })
              }
            })
          })
      }
    },
    rightTreeFilter (value, data, node) {
      return this.selectTreeId.includes(data.id)
    },
    goRight () {
      this.rightTree = JSON.parse(JSON.stringify(this.tempTree))
      this.$nextTick(() => {
        this.$refs.rightTree.filter()
      })
    },
    goLeft () {
    },
    allGoLeft () {
    },
    handleFilter () {
      this.leftTree = []
      this.$nextTick(() => {
        this.getCategoryTree({ likeCondition: this.likeCondition })
          .then((res) => {
            this.leftTree = res
          })
      })
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.indusrty-select-dialog >>>
  .el-dialog
    margin-left calc((100vw - 1100px) / 2) // 屏幕宽度 - （抽屉宽度 + 弹出框宽度 ）的一半
  .tree-transfer
    display flex
    .transfer-left
      border-radius 1px
      width 46%
      border 1px solid #E7E7E7
    .transfer-center
      border-radius 1px
      width 8%
      margin auto 0
      text-align center
      .el-button
        margin-left 0
        margin-bottom 10px
    .transfer-right
      border-radius 1px
      width 46%
      border 1px solid #E7E7E7
    .header
      background-color #FAFAFA
      padding 16px
    .tree-wapper
      height 50vh
    .check-all
      padding 10px 0

</style>
