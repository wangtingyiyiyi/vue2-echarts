<template>
  <el-button class="drawer-btn" @click="btnClick">
    <div class="flex-column">
      <i  :class="drawerShow ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      <span>高</span>
      <span>级</span>
      <span>筛</span>
      <span>选</span>
     </div>
  </el-button>
</template>

<script>
export default {
  name: 'IndustryDrawerSlotBtn',
  props: {
    drawerShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    btnClick () {
      this.$emit('handleDrawerBtn')
    }
  }
}
</script>

<style lang="stylus" scoped>
.drawer-btn
  background-color $base-green
  color #fff
  border 1px solid #F8F8F8

  .flex-column
    display flex
    flex-direction column
    line-height 22px

    span
      margin-left 0

</style>
