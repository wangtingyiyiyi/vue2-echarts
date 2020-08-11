<template>
  <div>
    <!-- <div class="drawer-mask" /> -->
    <div class="drawer">
      <slot name="button"/>
      <div class="drawer-items" v-if="drawerShow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    drawerShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .drawer-mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: @shadow-color;
    transition: all 0.5s;
    z-index: 100;
    &.open{
      display: inline-block;
    }
    &.close{
      display: none;
    }
  }
</style>
