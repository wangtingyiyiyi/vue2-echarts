<template>
  <el-main style="display: flex;">
    <div :class="[collapsed ? 'width-63' : 'width-180', 'wapper']"></div>
    <div style="flex: 0 0 20px;"></div>
    <!-- <router-view style="width: calc(100% - 220px);"  :key="key" /> -->
    <router-view :class="[collapsed ? 'width-o' : 'width-s']" :key="key" />
  </el-main>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>
<style lang="stylus" scoped>
.width-180
  flex 0 0 180px
.width-63
  flex 0 0 63px
.width-s
  width calc(100% - 220px)
.width-o
  width calc(100% - 63px)
.wapper
  background-color white
  min-height calc(100vh - 60px - 107px)
  // min-height auto
</style>
