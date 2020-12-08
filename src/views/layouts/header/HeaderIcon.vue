<template>
  <div class="flex-row">
    <Svg-Icon icon-class="logoIcon" class="logo-icon"/>
    <Svg-Icon icon-class="logoText" class="logo-text m-l-10" v-if="!collapsed"/>
    <i
      @click="collapsClick"
      style="cursor: pointer;"
      :class="[collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold', 'm-l-18']" />
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    collapsClick () {
      this.$emit('collapsChange', this.collapsed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.logo-icon
  width 27px
  height 27px
.logo-text
  height 27px
  width 72px
</style>
