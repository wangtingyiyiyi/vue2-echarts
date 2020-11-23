<template>
  <!-- <el-main style="display: flex;">
    <div :class="[collapsed ? 'width-63' : 'width-180', 'wapper']"></div>
    <div style="flex: 0 0 20px;"></div>
    <router-view :class="[collapsed ? 'width-o' : 'width-s']" :key="key" />
  </el-main> -->
  <el-main :class="[collapsed ? 'width-collapsed' : 'width-not-collapsed']">
    <router-view :key="key" />
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
.width-collapsed
  margin-left 65px
.width-not-collapsed
  margin-left 181px
</style>
