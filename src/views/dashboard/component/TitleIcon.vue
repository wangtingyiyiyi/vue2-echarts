<template>
  <div class="m-t-12">
    <Svg-Icon :icon-class="icon" class="second-color"/>
    <span class="second-color title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'TitleIcon',
  props: {
    icon: {
      type: String,
      default: 'dashboard'
    },
    title: {
      type: String,
      default: '行业流量'
    }
  }
}
</script>

<style lang="stylus" scoped>
.second-color
  color $color-second
.title
  font-weight bold
  margin-left 10px
</style>
