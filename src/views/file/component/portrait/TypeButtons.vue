<template>
  <div class="flex-row">
    <div
      v-for="item in OPERATOR_BUTTONS"
      :key="item.value"
      :class="[activedType === item.value ? 'is-actived' : '', 'buttons']"
      @click="handleClick(item.value)"
      >{{item.label}}</div>
  </div>
</template>

<script>
import { OPERATOR_BUTTONS } from '@/utils/const.js'

export default {
  name: 'TypeButtons',
  props: {
    activedType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      OPERATOR_BUTTONS
    }
  },
  methods: {
    handleClick (value) {
      this.$emit('handleChangeActiveType', value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-row
  display flex
  align-items center
.buttons
  width 140px
  height 32px
  background-color #F8F8F9
  display flex
  align-items center
  justify-content center
  margin-right 40px
  border-radius 2px
  cursor pointer
  border 1px solid transparent
  &:focus, &:hover
    border 1px solid $base-blue
    color $base-blue
    background-color #fff

.is-actived
  background-color $base-blue
  color #ffffff
  &:focus, &:hover
    background-color $base-blue
    color #ffffff
</style>
