<template>
  <div class="text-button" @click.stop="click">
    <slot name="prepend"/>
    <span class="text-overflow" :style="{maxWidth: maxWidth}">{{text}}</span>
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
    },
    maxWidth: {
      type: String,
      default: '0px'
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
