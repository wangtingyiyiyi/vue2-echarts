<template>
  <div class="text-button" @click="click">
    <i v-if="iconClass" :class="iconClass"></i>
    {{text}}
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
    iconClass: {
      type: String,
      default: ''
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
</style>
