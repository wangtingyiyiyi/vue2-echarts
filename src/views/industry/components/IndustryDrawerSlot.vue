<template>
  <div class="drawer-content">
    抽屉内容
  </div>
</template>

<script>
export default {
  name: 'IndustryDrawerSlot'
}
</script>

<style lang="stylus" scoped>
  .drawer-content
    position relative
    z-index 1
    overflow auto
    background-color #fff
    background-clip padding-box
    border 0
    height 80vh
    margin-top 10vh
</style>
