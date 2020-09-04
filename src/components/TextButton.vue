<template>
  <div class="text-button" @click="click">
    <slot name="prepend"/>
    {{text}}
    <slot name="append"/>
  </div>
</template>

<script>
export default {
  name: 'TextButton',
  props: {
    text: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    click () {
      this.$emit('handleClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
.text-button
  color $base-blue
  display inline-block
  cursor pointer
  display flex
  align-items center
</style>
