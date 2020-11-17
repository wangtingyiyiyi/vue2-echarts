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
          @change="handleCheckAll">全选{{showExpandTree}}</el-checkbox>
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
          :default-expanded-keys="allRightParentKeys">
        </el-tree>
        <!-- 搜索树 -->
        <el-tree
          v-show="showExpandTree"
          :data="searchTreeData"
          :props="{ label: 'category', isLeaf: 'isLeaf' }"
          show-checkbox
          node-key="label"
          ref="searchTree"
          :default-expand-all="true"
          class="tree-wapper beauty-scroll">
        </el-tree>
      </div>

      <div class="transfer-center">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          class="center-btn"
          @click="goRight"></el-button>
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          class="center-btn"
          @click="goLeft"></el-button>
        <el-button
          type="primary"
          icon="el-icon-d-arrow-left"
          class="center-btn"
          @click="allGoLeft"></el-button>
      </div>

      <div class="transfer-right">
        <div class="header">已选中品类项</div>
        <!-- 选中树 -->
        <el-tree
          show-checkbox
          ref="rightTree"
          node-key="label"
          class="right-tree-wapper beauty-scroll"
          :data="rightTree"
          :props="{ label: 'category' }"
          :default-expand-all="false">
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
import { getCategoryTree } from '@/api/industry'
import { getDefineTree } from '@/api/define'

// import { refLoading } from '@/utils/element.js'

export default {
  name: 'DialogForIndustryDefine',
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    },
    cateId: {
      type: Array,
      default: () => []
    },
    editDefineName: {
      type: String,
      default: ''
    }
  },
  // watch: {
  //   editDefineName: {
  //     immediate: true,
  //     deep: true,
  //     handler: function (editDefineName) {
  //       this.form.category = editDefineName
  //     }
  //   }
  // },
  data () {
    return {
      likeCondition: '',
      checkAll: false,
      form: {
        cateList: '',
        title: ''
      },
      lazyTreeData: [],
      searchTreeData: [],
      rightTree: [],
      showExpandTree: false,
      rootTree: [],
      allRightParentKeys: [],
      checkedNotes: []
    }
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
    // 全选
    handleCheckAll (checked) {
    },
    goRight () {
      this.checkedNotes = this.$refs.lazyTree.getCheckedNodes()
      this.renderRightTree()
    },
    goLeft () {

    },
    allGoLeft () {
    },
    // 关键字搜索
    handleFilter () {
      this.searchTreeData = []
      if (this.likeCondition) {
        this.showExpandTree = true
        this.$nextTick(() => {
          this.getCategoryTree({ likeCondition: this.likeCondition })
            .then((res) => {
              this.searchTreeData = res
            })
        })
      } else {
        this.showExpandTree = false
        this.searchTreeData = this.rootTree
      }
    },
    async getCategoryTree (param = {}) {
      const res = await getCategoryTree(param)
      if (res.code === 200) {
        return res.result
      }
    },
    // 异步加载回调函数
    loadNode (node = {}, resolve) {
      if (node.level === 0) {
        this.getCategoryTree().then((res) => {
          this.lazyTreeData = res
          this.rootTree = this._.cloneDeep(res)
        })
      } else {
        this.getCategoryTree(node.data).then((res) => {
          resolve(res)
        })
      }
    },
    async renderRightTree () {
      const res = await getDefineTree({ cateList: this.checkedNotes })
      if (res.code === 200) {
        this.rightTree = res.result
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
