<template>
<transition name="fade">
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
            clearable
            placeholder="请输入关键字，回车搜索"
            @clear="handleFilter"
            @keydown.enter.native="handleFilter"></el-input>
        </div>
        <el-checkbox
          v-model="checkAll"
          class="m-l-16 p-10-0"
          :disabled="!showExpandTree"
          @change="handleCheckAll">全选</el-checkbox>
        <!-- 异步请求树 -->
        <el-tree
          v-show="!showExpandTree"
          show-checkbox
          node-key="label"
          ref="lazyTree"
          lazy
          class="tree-wapper beauty-scroll"
          :data="lazyTreeData"
          :props="{ label: 'category', isLeaf: 'isLeaf' }"
          :load="loadNode"
          :check-strictly="false"
          :default-expanded-keys="lazyTreeExpandedkeys"
          @check="handleLeftTreeCheck">
        </el-tree>
        <!-- 搜索树 -->
        <el-tree
          v-show="showExpandTree"
          ref="searchTree"
          show-checkbox
          node-key="label"
          class="tree-wapper beauty-scroll"
          :data="searchTreeData"
          :props="{ label: 'category', isLeaf: 'isLeaf' }"
          :default-expand-all="true"
          @check="handleLeftTreeCheck">
        </el-tree>
      </div>

      <div class="transfer-center">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          class="center-btn"
          :disabled="disabledGoRight"
          @click="goRight"></el-button>
        <el-button
          plain
          icon="el-icon-arrow-left"
          class="center-btn"
          :disabled="disabledGoLeft"
          @click="goLeft"></el-button>
        <el-button
          plain
          icon="el-icon-d-arrow-left"
          class="center-btn"
          :disabled="rightTree.length === 0"
          @click="allGoLeft"></el-button>
      </div>

      <div class="transfer-right">
        <div class="header">已选中品类项</div>
        <!-- 选中树 -->
        <el-tree
          show-checkbox
          ref="resTree"
          node-key="label"
          class="right-tree-wapper beauty-scroll"
          :data="rightTree"
          :props="{ label: 'category' }"
          :default-expand-all="true"
          @check="handleRightTreeCheck">
        </el-tree>
      </div>
    </div>

    <el-form inline class="m-t-24" :model="form" ref="form">
      <el-form-item
        label="自定义标签名称"
        prop="title"
        :rules="{ required: true, message: '请输入自定义品类标签名'}">
        <el-input
          placeholder="保存选中对比品类标签"
          v-model="form.title"
          style="width: 215px"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="onSubmit">保 存</el-button>
    </span>
  </el-dialog>
</transition>
</template>

<script>
import { getDefineTree, getDefineCateList } from '@/api/define'
export default {
  name: 'DialogForIndustryDefine',
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    },
    defineId: {
      type: [Number, String],
      default: ''
    },
    defineName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      likeCondition: '缝纫',
      checkAll: false,
      form: {
        cateList: '',
        title: this.defineName,
        id: this.defineId
      },
      lazyTreeData: [],
      searchTreeData: [],
      rightTree: [],
      showExpandTree: false,
      rootTree: [],
      lazyTreeExpandedkeys: [],
      defaultCheckedKeys: [],
      checkedNotes: [],
      disabledGoRight: true,
      disabledGoLeft: true,
      rightTreeFlat: [],
      resLeafData: []
    }
  },
  mounted () {
    this.renderRightTree({ defineId: this.defineId })
      .then(() => {
        this.setCheckedKeys()
        this.setLazyTreeExpandedKeys()
      })
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.cateList = this.rightTree
          this.$emit('onSubmit', this.form)
        }
      })
    },
    // 控制 goRight 按钮点击状态
    handleLeftTreeCheck (data, tree) {
      this.disabledGoRight = tree.checkedNodes.length === 0
    },
    // 控制 goLeft 按钮点击状态
    handleRightTreeCheck (data, tree) {
      this.disabledGoLeft = tree.checkedNodes.length === 0
    },
    // 全选
    handleCheckAll (checked) {
      this.$refs.searchTree.setCheckedNodes(checked ? this.searchTreeData : [])
      this.disabledGoRight = !checked
    },
    goRight () {
      const lazyTreeCheckedNotes = this.$refs.lazyTree.getCheckedNodes(false)
      const searchTreeCheckedNotes = this.$refs.searchTree.getCheckedNodes(true)
      this.checkedNotes = this._.uniqBy([...lazyTreeCheckedNotes, ...searchTreeCheckedNotes, ...this.resLeafData], 'label')
      this.renderRightTree()
        .then(() => {
          this.disabledGoRight = true
          if (!this.showExpandTree) {
            this.setLazyTreeExpandedKeys()
          }
          this.setCheckedKeys()
        })
    },
    goLeft () {
      const checked = this.$refs.resTree.getCheckedNodes(true)// 选中的子节点
      this.checkedNotes = this._.xorBy([...checked], this.resLeafData, 'label')
      this.renderRightTree()
        .then(() => {
          this.disabledGoLeft = true
          this.renderLeftTree()
            .then(() => {
              this.setCheckedKeys()
              this.setLazyTreeExpandedKeys()
            })
        })
    },
    allGoLeft () {
      this.lazyTreeExpandedkeys = []
      this.rightTree = []
      this.lazyTreeData = this.rootTree
      this.handleCheckAll(false)
      this.checkAll = false
    },
    flatTree (data) {
      return data.reduce((arr, { category, category1, category2, category3, label, rank, children = [] }) =>
        arr.concat([{ category, category1, category2, category3, label, rank }], this.flatTree(children)), [])
    },
    setCheckedKeys () {
      const resRank3 = this.rightTreeFlat.filter(item => {
        return item.rank === 3
      }).map(item => item.label)
      this.$refs.lazyTree.setCheckedKeys(resRank3)
      this.$refs.searchTree.setCheckedKeys(resRank3)
    },
    setLazyTreeExpandedKeys () {
      this.lazyTreeExpandedkeys = this.rightTreeFlat.filter(item => {
        return item.rank === 1 || item.rank === 2
      }).map(item => item.label)
    },
    // 关键字搜索
    handleFilter () {
      this.searchTreeData = []
      this.checkAll = false
      if (this.likeCondition) {
        this.showExpandTree = true
        this.getDefineCateList({ likeCondition: this.likeCondition })
          .then((res) => {
            this.searchTreeData = res
            this.setCheckedKeys()
            this.setLazyTreeExpandedKeys()
          })
      } else {
        this.showExpandTree = false
        this.searchTreeData = this.rootTree
        this.setCheckedKeys()
        this.setLazyTreeExpandedKeys()
      }
    },
    async getDefineCateList (param = {}) {
      const res = await getDefineCateList(param)
      if (res.code === 200) {
        return res.result
      }
    },
    // 异步加载回调函数
    loadNode (node = {}, resolve) {
      if (node.level === 0) {
        this.getDefineCateList()
          .then((res) => {
            this.lazyTreeData = res
            this.rootTree = this._.cloneDeep(res)
          })
      } else {
        if (node.data.children.length !== 0) {
          resolve(node.data.children)
          return
        }
        this.getDefineCateList(node.data)
          .then((res) => {
            resolve(res)
          })
      }
    },
    async renderRightTree (definedId = {}) {
      const res = await getDefineTree(Object.assign({ cateList: this.checkedNotes, type: 'right' }, definedId))
      if (res.code === 200) {
        this.rightTree = res.result
        this.rightTreeFlat = this.flatTree(res.result)
        this.resLeafData = this.rightTreeFlat.filter(item => item.rank === 3)
      }
    },
    async renderLeftTree () {
      const res = await getDefineTree({ cateList: this.checkedNotes, type: 'left' })
      if (res.code === 200) {
        this.lazyTreeData = res.result
        this.rootTree = this._.cloneDeep(res.result)
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
      .center-btn
        width: 70%
        padding 5px 15px
        margin-left 0
        margin-bottom 10px
    .transfer-right
      border-radius 1px
      width 46%
      border 1px solid #E7E7E7
    .header
      background-color #FAFAFA
      padding 16px
      height 32px
      line-height 2
    .tree-wapper
      height 50vh
    .right-tree-wapper
      height calc(50vh + 40px)
</style>
