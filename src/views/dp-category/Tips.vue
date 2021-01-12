<template>
  <div class="tips">
    <slot></slot>
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
