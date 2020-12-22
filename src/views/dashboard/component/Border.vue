<template>
  <div class="broder">
    <slot name="part1" />
    <slot name="part2" />
  </div>
</template>

<script>
export default {
  name: 'Border'
}
</script>

<style lang="stylus" scoped>
.broder
  border-width 1px
  border-style solid
  border-color $color-light-border
  border-radius 8px
  padding 16px 32px
  &:focus, &:hover
    border-color $base-blue
    cursor pointer
    box-shadow 0px 2px 12px 0px rgba(29, 40, 61, 0.1)
</style>
