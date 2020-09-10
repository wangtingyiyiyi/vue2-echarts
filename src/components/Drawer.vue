<template>
  <div>
    <div :class="['mask', visible ? 'open' : 'close']"  @click="close"/>
    <div :class="['drawer', visible ? 'open' : 'close']">
      <slot/>
      <slot name="button"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('handleDrawerClose', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mask
    position fixed
    left 0
    right 0
    bottom 0
    top 0
    background-color $shadow-color
    transition all 0.5s
    // z-index 100
    z-inde 2
    &.open
      display inline-block
    &.close
      display none

  .drawer
    position fixed
    transition all 0.5s
    height 100vh
    width 400px
    // z-index 100
    z-index 2
    right 0px
    &.close
      transform: translateX(100%)

</style>
