<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    class="indusrty-select-dialog"
    width="30%">
    <div slot="title">品类搜索</div>

    <div>
      穿梭
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
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
.indusrty-select-dialog >>> .el-dialog
  .el-dialog__header
    border-bottom 2px solid $color-border
  .el-dialog__footer
    text-align center
</style>
