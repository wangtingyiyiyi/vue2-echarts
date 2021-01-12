<template>
  <div class="button">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'CurrentType',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.button
  border 1px dotted $base-blue
  background #F9F9F9
  color $base-blue
  padding 3px 12px
</style>
