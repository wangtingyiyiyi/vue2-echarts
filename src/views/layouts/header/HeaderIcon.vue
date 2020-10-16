<template>
  <div :class="[collapsed ? 'collapse-logo' : 'expansion-logo', 'flex-row']">
    <Svg-Icon
      :icon-class="collapsed ? 'logo1' : 'logo'"
      :class="[collapsed ? 'svg-class1' : 'svg-class']"/>
    <i
      @click="collapsClick"
      :class="[collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold', 'm-l-10']" />
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
.logo {
  background: $base-blue;
  color: #ffffff;
  padding: 4px 28px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expansion-logo {
  padding: 0 20px;
  div {
    width: 140px;
  }
}
.collapse-logo {
  width: 80px;
  padding: 0 20px;
  div {
    width: 40px;
  }
}

.svg-class
  width 109px
  height 36px

.svg-class1
  width 26px
  height 26px
</style>
