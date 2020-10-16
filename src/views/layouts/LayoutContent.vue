<template>
  <el-main style="display: flex;">
    <div :class="[collapsed ? 'width-63' : 'width-200', 'wapper']"></div>
    <div style="flex: 0 0 20px;"></div>
    <router-view style="width: calc(100% - 220px);"  :key="key" />
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
.width-200
  flex 0 0 200px
.width-63
  flex 0 0 63px
.wapper
  background-color white
  min-height calc(100vh - 60px - 107px)
  // min-height auto
</style>
