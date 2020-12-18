<template>
  <el-backtop target=".scroll-container"></el-backtop>
</template>

<script>
export default {
  name: 'BackTop',
  props: {
    target: {
      type: String,
      default: ''
    }
  }
}
</script>
