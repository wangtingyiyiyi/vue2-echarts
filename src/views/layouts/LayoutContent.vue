<template>
  <el-main>
    <router-view :key="key" />
  </el-main>
</template>

<script>
export default {
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>
