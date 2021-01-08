<template>
  <div
    :class="[isDisabled ? 'isDisabled': '', 'button']"
    v-if="showButton"
    @click="handleExportExcel" >
    <Svg-Icon :icon-class="svgName" class="m-r-8" />
    <span style="font-weight: bold;">{{label}}</span>
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
  border 1px solid $base-green
  color #ffffff
  background $base-green
  padding 8px 10px
  min-width 65px
  text-align center
  border-radius 2px
  line-height 12px
  cursor pointer
  opacity 1
.isDisabled
  color #ffffff
  background $base-green
  border-color $base-green
  cursor not-allowed
  pointer-events none
  opacity 0.7

</style>
