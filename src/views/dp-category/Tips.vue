<template>
  <div class="tips">
    <Svg-Icon class="m-r-8" :icon-class="icon" />
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'descending'
    }
  }
}
</script>

<style lang="stylus" scoped>
.tips
  display flex
  align-items center
  color $color-second
  font-size 13px
  line-height 13px
</style>
