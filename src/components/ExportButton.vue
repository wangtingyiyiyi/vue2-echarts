<template>
  <div
    :class="[isDisabled ? 'isDisabled': '', 'button']"
    v-if="showButton"
    @click="handleExportExcel" >
    <Svg-Icon :icon-class="svgName" class="m-r-8" :style="{color: iconColor}"/>{{label}}
  </div>
</template>

<script>
export default {
  name: 'ExportButton',
  props: {
    showButton: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: '导出'
    },
    svgName: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconColor () {
      if (this.isDisabled) {
        return '#ADC7FC'
      } else {
        return '#5B8FF9'
      }
    }
  },
  methods: {
    handleExportExcel () {
      this.$emit('handleExportExcel')
    }
  }
}
</script>

<style lang="stylus" scoped>
.button
  border 1px solid $base-blue
  color $base-blue
  padding 8px 10px
  min-width 65px
  text-align center
  border-radius 2px
  line-height 12px
  cursor pointer
  &:focus, &:hover
    background-color #F2F6FF
.isDisabled
  color #ADC7FC
  border-color #ADC7FC
  cursor not-allowed
  &:focus, &:hover
    background-color #fff

</style>
