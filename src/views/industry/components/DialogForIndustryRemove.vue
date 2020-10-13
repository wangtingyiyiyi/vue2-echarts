<template>
  <transition name="fade">
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      class="indusrty-remove-dialog"
      :modal="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      top="40vh"
      width="432px">
      <div class="title">
        <Svg-Icon icon-class="question" class="icon"/>
        <div>确认删除<span class="warning-color"> {{removeObj.category}} </span>吗？</div>
      </div>
      <div class="conent">您正在删除{{removeObj.category}}行业。删除后本条自定义不能恢复。</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
  </transition>
</template>

<script>

export default {
  name: 'DialogForIndustryRemove',
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    },
    removeObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onCancel () {
      this.$parent.$parent.$refs.mask.style.backgroundColor = 'rgba(0,0,0,0.3)'
      this.$emit('closeDialog', false)
    },
    onSubmit () {
      this.$emit('onSubmit', [this.removeObj.categoryId])
    }
  }
}
</script>

<style lang="stylus" scoped>
.indusrty-remove-dialog >>>
  background-color: rgba(0,0,0,0.3)
  .el-dialog
    .el-dialog__header
      display none
    .el-dialog__footer
      text-align right
  .icon
    font-size 22px
    margin-right 16px
  .warning-color
    color #FFBF00
  .title
    color #000000
    font-size 16px
    font-weight 500
    line-height 24px
    display flex
    margin-bottom 12px
  .conent
    margin-left 40px
    line-height 22px
</style>
