<template>
  <div>
    <el-button @click="onCancel">取消</el-button>
    <el-button type="primary" @click="onExcel">导出</el-button>
  </div>
</template>

<script>
export default {
  name: 'PreviewFooterButton',
  props: {
    btnDisabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onCancel () {
      this.$emit('hanleOnCancel')
    },
    onExcel () {
      this.$emit('handleOnExcel')
    }
  }
}
</script>
