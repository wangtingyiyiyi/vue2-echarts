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
          <el-input
            v-model="likeCondition"
            placeholder="请输入关键字，回车搜索"
            clearable
            @clear="handleFilter"
            @keydown.enter.native="handleFilter"></el-input>
        </div>
        <el-checkbox
          v-model="checkAll"
          class="m-l-16 check-all"
          :disabled="!showExpandTree"
          @change="handleCheckAll">全选</el-checkbox>
          <div>{{selectedIds}}</div>
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
          :default-expanded-keys="allRightParentKeys"
          @check="handleLeftTreeCheck">
        </el-tree>
        <!-- 搜索树 -->
        <el-tree
          v-show="showExpandTree"
          :data="leftTree"
          :props="leftTreeProps"
          show-checkbox
          node-key="id"
          ref="leftTree2"
          :default-expand-all="true"
          class="tree-wapper beauty-scroll"
          :render-content="renderContent"
          @check="handleLeftTreeCheck">
        </el-tree>
      </div>
      <div class="transfer-center">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          :disabled="disabledGoRight"
          @click="goRight"></el-button>
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          :disabled="disabledGoLeft"
          @click="goLeft"></el-button>
        <el-button
          type="primary"
          icon="el-icon-d-arrow-left"
          :disabled="selectedIds.length === 0"
          @click="allGoLeft"></el-button>
      </div>
      <div class="transfer-right">
        <div class="header">已选中品类项</div>
        <!-- 选中树 -->
        <el-tree
          show-checkbox
          ref="rightTree"
          node-key="id"
          class="tree-wapper beauty-scroll"
          :data="rightTree"
          :props="{ children: 'childList' }"
          :default-expand-all="true"
          :render-content="renderContent"
          @check="handleRightTreeCheck">
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
import { getCategoryTree, getCategoryTreeByCategoyrId } from '@/api/industry'

// import { refLoading } from '@/utils/element.js'

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
      likeCondition: '面霜',
      checkAll: false,
      form: {},
      leftTree: [],
      rightTree: [],
      selectTreeId: [],
      showExpandTree: false,
      canCheckAll: true,
      leftTreeProps: {
        isLeaf: 'isLeaf',
        children: 'childList',
        disabled: this.disabledFn
      },
      checkedLeft1: [],
      checkedLeft2: [],
      selectedIds: [], // 全部的选中节点id
      allRightKeys: [],
      rightHalfKeys: [],
      rootTree: [],
      allRightLeafKeys: [],
      defaultChecked: [],
      allRightParentKeys: [],
      disabledGoLeft: true,
      disabledGoRight: true
    }
  },
  methods: {
    disabledFn (data, node) {
      const keys1 = this._.cloneDeep(this.allRightLeafKeys)
      const keys2 = this._.cloneDeep(this.selectedIds)
      keys1.push(...keys2)
      return keys1.includes(data.id)
    },
    // 控制 goRight 按钮点击状态
    handleLeftTreeCheck (data, tree) {
      this.disabledGoRight = tree.checkedNodes.length === 0
    },
    // 控制 goLeft 按钮点击状态
    handleRightTreeCheck (data, tree) {
      this.disabledGoLeft = tree.checkedNodes.length === 0
    },
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    onCancel () {
      this.closeDialog()
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = {
            categoryDefine: this.form.category,
            list: this.selectedIds
          }
          this.$emit('onSubmit', param)
        }
      })
    },
    // 全选
    handleCheckAll (checked) {
      const ids = []
      if (checked) {
        this.disabledGoRight = false
        this.leftTree.forEach(level1 => {
          if (level1.hasChild) {
            level1.childList.forEach(level2 => {
              if (level2.hasChild) {
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
    // tree 节点渲染函数
    renderContent (h, { node, data, store }) {
      const k = `outCat${data.remark}`
      return (
        <span class="custom-tree-node">
          <span>{data[k]} - {data.id}</span>
        </span>)
    },
    goRight () {
      this.selectedIds = []
      const checked2 = this.$refs.leftTree2.getCheckedKeys(true)
      const checked1 = this.$refs.leftTree1.getCheckedKeys(false)
      this.selectedIds.push(...checked1, ...checked2)
      this.selectedIds = this._.uniq(this.selectedIds) // 数组去重
      this.disabledGoRight = true
      this.renderRightTree()
    },
    goLeft () {
      const checked = this.$refs.rightTree.getCheckedKeys(false) // 选中节点
      const halfChecked = this.$refs.rightTree.getHalfCheckedKeys() // 半选节点
      const selectedIds = this._.cloneDeep(this.selectedIds)
      this.selectedIds = this._.pullAll(selectedIds, checked.concat(halfChecked))
      this.disabledGoLeft = true
      this.renderLeftTree().then(() => {
        this.renderRightTree()
      })
    },
    allGoLeft () {
      this.selectedIds = []
      this.halfChecked = []
      this.allRightLeafKeys = []
      this.allRightParentKeys = []
      this.rightTree = []
      this.leftTree = this.rootTree
    },
    // 搜索回调
    handleFilter () {
      this.leftTree = []
      if (this.likeCondition) {
        this.showExpandTree = true
        this.$nextTick(() => {
          this.getCategoryTree({ likeCondition: this.likeCondition })
            .then((res) => {
              this.leftTree = res
            })
        })
      } else {
        this.showExpandTree = false
        this.leftTree = this.rootTree
      }
    },
    // right tree
    async renderRightTree () {
      if (this.selectedIds.length === 0) {
        this.rightTree = []
        return
      }
      const res = await getCategoryTreeByCategoyrId({ cateIdList: this.selectedIds, state: 0 })
      if (res.code === 200) {
        this.rightTree = res.result
        this.allRightKeys = []
        const allRightLeafKeys = []
        this.allRightParentKeys = []
        res.result.forEach(item => {
          this.allRightKeys.push(item.id)
          this.rightHalfKeys.push(item.id)
          this.allRightParentKeys.push(item.id)
          if (item.hasChild) {
            item.childList.forEach(level2 => {
              this.allRightKeys.push(level2.id)
              this.allRightParentKeys.push(level2.id)
              if (level2.hasChild) {
                level2.childList.forEach(level3 => {
                  this.allRightKeys.push(level3.id)
                  allRightLeafKeys.push(level3.id)
                })
              }
            })
          }
        })
        this.allRightLeafKeys = this._.uniq(allRightLeafKeys)
        const selectedIds = this.selectedIds
        selectedIds.push(...this.allRightLeafKeys)
        this.selectedIds = this._.uniq(selectedIds)
        this.$nextTick(() => {
          this.$refs.leftTree1.setCheckedKeys(this.selectedIds)
          this.$refs.leftTree2.setCheckedKeys(this.selectedIds)
        })
      }
    },
    // left tree
    async renderLeftTree () {
      if (this.selectedIds.length === 0) {
        this.leftTree = this.rootTree
        return
      }
      const res = await getCategoryTreeByCategoyrId({ cateIdList: this.selectedIds, state: 1 })
      if (res.code === 200) {
        this.leftTree = res.result
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
    // 异步加载回调函数
    loadNode (node = {}, resolve) {
      if (node.level === 0) {
        this.getCategoryTree().then((res) => {
          this.leftTree = res
          this.rootTree = this._.cloneDeep(res)
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
