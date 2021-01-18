<template>
  <div class="icon-wapper" :class="[collapsed ? 'not-collapsed' : 'collapsed']">
    <div>
      <Svg-Icon icon-class="logoIcon" class="logo-icon"/>
      <Svg-Icon icon-class="logoText" class="logo-text m-l-10" v-if="!collapsed"/>
    </div>
    <i
      @click="collapsClick"
      style="cursor: pointer; color: #ffffff"
      :class="[collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold']" />
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
  width 38px
  height 38px
  color #FFFFFF
.logo-text
  height 38px
  width 72px
  color #FFFFFF
.icon-wapper
  height 24px
  padding 20px 10px 20px 20px
  background-color #0065BD
  display flex
  align-items center
  justify-content space-between
  box-shadow 0px 2px 4px rgba(0, 0, 0, 0.1)
.collapsed
  width 170px
.not-collapsed
  width 35px
</style>
