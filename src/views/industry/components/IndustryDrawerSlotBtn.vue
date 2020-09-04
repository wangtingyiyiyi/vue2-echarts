<template>
  <div class="drawer-btn" @click="btnClick">
    <div class="flex-column">
      <i  :class="drawerShow ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      <span>高</span>
      <span>级</span>
      <span>筛</span>
      <span>选</span>
     </div>
  </div>
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
  border 0
  border-radius: 4px 0 0 4px
  position: absolute
  top 10vh
  left -42px
  z-index 0
  pointer-events: auto
  padding 9px 15px
  cursor pointer

  .flex-column
    display flex
    flex-direction column
    line-height 22px

    span
      margin-left 0

</style>
