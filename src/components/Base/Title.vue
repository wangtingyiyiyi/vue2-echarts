<template>
  <div class="wapper">
    <div class="icon"></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.wapper
  display flex
  align-items center
  margin-bottom 10px

  .icon
    height 12px
    width 3px
    background-color $base-blue
  .title
    padding-left 8px
</style>
