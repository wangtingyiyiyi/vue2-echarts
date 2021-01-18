<template>
  <router-view :key="key" style="min-width: 1608px"/>
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
