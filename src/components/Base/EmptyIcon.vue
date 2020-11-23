<template>
  <div class="empty-wapper">
    <Svg-Icon
      icon-class="empty"
      class="empty-icon"/>
  </div>
</template>

<script>
export default {
  name: 'EmptyIcon'
}
</script>

<style lang="stylus" scoped>
.empty-wapper
  height 200px
  width 100%
  margin-top 50px
  display flex
  justify-content: center
  .empty-icon
    width 160px
    height 200px
</style>
