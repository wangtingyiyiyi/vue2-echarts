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
    <div slot="title">高级筛选</div>

    <div class="tree-transfer" ref="transferWapper">
      <div class="transfer-left">
        <div class="header">
          <el-input v-model="likeCondition" placeholder="请输入关键字，回车搜索" @keydown.enter.native="handleFilter"></el-input>
        </div>
        <!-- :disabled="!showExpandTree" -->
        <el-checkbox
          v-model="checkAll"
          class="m-l-16 check-all"
          :disabled="canCheckAll"
          @change="handleCheckAll">全选</el-checkbox>
        <!-- 异步请求树 -->
        <el-tree
          v-show="!showExpandTree"
          :data="leftTree"
          :props="leftTreeProps"
          show-checkbox
          node-key="id"
          ref="leftTree1"
          lazy
          class="tree-wapper beauty-scroll"
          :render-content="renderContent"
          :load="loadNode"
          @check-change="handleLeftCheck">
        </el-tree>
        <!-- 同步请求树 -->
        <el-tree
          v-show="showExpandTree"
          :data="leftTree"
          :props="leftTreeProps"
          show-checkbox
          node-key="id"
          ref="leftTree2"
          :check-strictly="true"
          :default-expand-all="true"
          class="tree-wapper beauty-scroll"
          :render-content="renderContent"
          @check-change="handleLeftCheck">
        </el-tree>
      </div>
      <div class="transfer-center">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          :disabled="!hasLeftCheck"
          @click="goRight"></el-button>
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          :disabled="!hasRightCheck"
          @click="goLeft"></el-button>
        <el-button
          type="primary"
          icon="el-icon-d-arrow-left"
          :disabled="selectTreeId.length === 0"
          @click="allGoLeft"></el-button>
      </div>
      <div class="transfer-right">
        <div class="header">已选中品类项</div>
        <el-tree
          show-checkbox
          ref="rightTree"
          node-key="id"
          class="tree-wapper beauty-scroll"
          :data="rightTree"
          :props="{ children: 'childList' }"
          :default-expand-all="true"
          :filter-node-method="rightTreeFilter"
          :render-content="renderContent"
          @check-change="handleRightCheck">
        </el-tree>
      </div>
    </div>

    <el-form inline class="m-t-24" :model="form" ref="form">
      <el-form-item
        label="自定义标签名称"
        prop="category"
        :rules="{ required: true, message: '请输入自定义品类标签名'}">
        <el-input
          placeholder="保存选中对比品类标签"
          v-model="form.category"
          style="width: 215px"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCategoryTree } from '@/api/industry'
import { refLoading } from '@/utils/element.js'

export default {
  name: 'DialogForIndustryDefine',
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      likeCondition: '',
      checkAll: false,
      form: {},
      leftTree: [],
      rightTree: [],
      rootTree: [],
      selectTreeId: [],
      showExpandTree: false,
      canCheckAll: true,
      cateList: [],
      leftTreeProps: {
        isLeaf: 'isLeaf',
        children: 'childList',
        disabled: this.disabledFn
      },
      listParam: [],
      checkedLeft1: [],
      checkedLeft2: [],
      hasLeftCheck: false,
      hasRightCheck: false
    }
  },
  methods: {
    disabledFn (data) {
      const disabledIds = this.cateList.map(item => item.id)
      return disabledIds.includes(data.id)
    },
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    onCancel () {
      this.closeDialog()
    },
    handleLeftCheck (data, self, child) {
      console.info(data, self, child)
      this.getCategoryTree({ categoryId: data.id }).then((res) => {
        console.info(res)
      })
      // if (this.showExpandTree) {
      //   this.checkedLeft2.push(...this.$refs.leftTree2.getCheckedNodes())
      //   this.hasLeftCheck = this.$refs.leftTree2.getCheckedNodes().length !== 0
      // } else {
      //   this.checkedLeft1.push(...this.$refs.leftTree1.getCheckedNodes())
      //   this.hasLeftCheck = this.$refs.leftTree1.getCheckedNodes().length !== 0
      // }
    },
    handleRightCheck () {
      this.hasRightCheck = this.$refs.rightTree.getCheckedNodes().length !== 0
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const uniq = this._.uniqWith(this.checkedLeft1.concat(this.checkedLeft2), this._.isEqual)
          const param = uniq.map(item => {
            return {
              outCat1: item.outCat1,
              outCat2: item.outCat2,
              outCat3: item.outCat3,
              categoryDefine: this.form.category
            }
          })
          this.$emit('onSubmit', param)
        }
      })
    },
    // 全选
    handleCheckAll (checked) {
      const ids = []
      if (checked) {
        this.leftTree.forEach(level1 => {
          ids.push(level1.id)
          if (level1.childList) {
            level1.childList.forEach(level2 => {
              ids.push(level2.id)
              if (level2.childList) {
                level2.childList.forEach(level3 => {
                  ids.push(level3.id)
                })
              }
            })
          }
        })
      }
      this.$refs.leftTree2.setCheckedKeys(ids)
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
    loadNode (node = {}, resolve) {
      if (node.level === 0) {
        this.getCategoryTree().then((res) => {
          this.leftTree = this._.cloneDeep(res)
          this.rootTree = this._.cloneDeep(res)
        })
      } else {
        this.getCategoryTree(node.data).then((res) => {
          resolve(res)
        })
      }
    },
    rightTreeFilter (value, data, node) {
      return this.selectTreeId.includes(data.id)
    },
    goRight () {
      if (this.showExpandTree) {
        this.cateList = this.$refs.leftTree2.getCheckedNodes().concat(this.cateList)
      } else {
        this.cateList = this.$refs.leftTree1.getCheckedNodes().concat(this.cateList)
      }
      this.selectTreeId = this.cateList.map(item => item.id).concat(this.selectTreeId)
      this.$refs.rightTree.setCheckedKeys([])
      this.$nextTick(() => {
        this.$refs.rightTree.filter()
      })
      this.hasLeftCheck = false
    },
    goLeft () {
      const checked = this.$refs.rightTree.getCheckedNodes(false, true).map(item => item.id)
      this.cateList = this.cateList.filter(item => {
        return !checked.includes(item.id)
      })
      this.selectTreeId = this.cateList.map(item => item.id)
      this.$refs.leftTree2.setCheckedKeys(this.selectTreeId)
      this.$refs.leftTree1.setCheckedKeys(this.selectTreeId)
      this.$refs.rightTree.setCheckedKeys([])
      this.$nextTick(() => {
        this.$refs.rightTree.filter()
      })
    },
    allGoLeft () {
      this.selectTreeId = []
      this.cateList = []
      this.$refs.leftTree2.setCheckedKeys([])
      this.$refs.leftTree1.setCheckedKeys([])
      this.$refs.rightTree.setCheckedKeys([])
      this.$nextTick(() => {
        this.$refs.rightTree.filter()
      })
      this.hasRightCheck = false
    },
    // 搜索回调
    handleFilter () {
      this.leftTree = []
      if (this.likeCondition) {
        this.showExpandTree = true
        this.$nextTick(() => {
          this.getCategoryTree({ likeCondition: this.likeCondition })
            .then((res) => {
              console.info(res)
              this.leftTree = res
            })
        })
      } else {
        this.showExpandTree = false
        this.leftTree = this.rootTree
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
    renderRightTree () {
      this.$nextTick(() => {
        const loadingInstance = refLoading(this.$refs.transferWapper)
        this.getCategoryTree({ flat: true }).then((res) => {
          loadingInstance.close()
          this.rightTree = res
          this.$nextTick(() => {
            this.$refs.rightTree.filter()
          })
        })
      })
    }
  },
  mounted () {
    // this.renderRightTree()
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
