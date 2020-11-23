<template>
  <div class="title-wapper">
    <div class="icon" :style="{backgroundColor: backgroundColor}"></div>
    <div class="title">{{title}}
      <span class="second-title">{{slotText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    },
    slotText: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#5b8ff9'
    }
  }
}
</script>

<style lang="stylus" scoped>
.title-wapper
  display flex
  align-items center
  margin-bottom 12px
  .icon
    height 14px
    width 3px
    background-color $base-blue
  .title
    padding-left 8px
    color $color-title
    font-weight 500
  .second-title
    color $color-light-gary
</style>
