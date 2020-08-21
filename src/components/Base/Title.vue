<template>
  <div class="title">{{title}}</div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  padding-left 10px
  border-left 4px solid $base-blue

</style>
