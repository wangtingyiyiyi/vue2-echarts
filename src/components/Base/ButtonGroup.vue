<template>
  <div class="flex-row">
    <slot name="label"/>
    <el-button-group>
      <el-button
        v-for="item in options"
        :key="item.value"
        :class="size"
        size="mini"
        :type="activeVal === item.value ? 'primary' : ''"
        @click="handleClick(item.value)">
        {{item.label}}
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    activeVal: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    formKey: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick (val) {
      const excelHeader = this._.find(this.options, function (item) {
        return item.value === val
      }).excelHeader || []
      this.$emit('handleClick', this.formKey, val)
      this.$emit('handleOnExcelHeader', this.formKey, excelHeader)
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-row
  display flex
  align-items center
.tiny
  height 22px
  padding 2px 14px 3px 14px
</style>
