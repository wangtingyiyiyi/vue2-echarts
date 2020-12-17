<template>
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
