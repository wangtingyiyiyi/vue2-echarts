<template>
  <div class="flex-row m-b-10">
    <div v-for="item in list" :key="item.label" class="module-item">
      <Svg-Icon :icon-class="item.icon" class="icon"/>
      <div class="title">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-row
  display flex
  justify-content: space-between

.module-item
  display flex
  align-items center
  flex-direction column
  width 100%
  padding 0 30px
  &:not(:last-child)
      border-right 1px solid #7274871A

.icon
  color $color-second
  width 20px
  height 20px
  margin-bottom 10px

.title
  color $color-second

</style>
