<template>
  <div :class="[collapsed ? 'collapse-logo' : 'expansion-logo']">
    <!-- <div class="logo">{{collapsed ? '谦' : '久谦中台'}}</div> -->
    <Svg-Icon icon-class="logo" class="svg-class"/>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
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
  // width: 200px;
  padding: 0 25px;
  div {
    width: 140px;
  }
}
.collapse-logo {
  width: 80px;
  padding: 0 15px;
  div {
    width: 40px;
  }
}

.svg-class
  width 120px
  height 32px
</style>
