<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    class="indusrty-select-dialog"
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="10vh"
    width="800px">
    <div slot="title">行业提数</div>

    <div>
      huhu
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">导出</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogForIndustryExport',
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.indusrty-select-dialog >>>
  .el-dialog
    margin-top 0px
    margin-bottom 50px
    margin-left calc((100vw - 1100px) / 2) // 屏幕宽度 - （抽屉宽度 + 弹出框宽度 ）的一半
  .el-dialog__header
    border-bottom 2px solid $color-border
  .el-dialog__footer
    text-align center
  .el-dialog__body
    padding 23px
</style>
