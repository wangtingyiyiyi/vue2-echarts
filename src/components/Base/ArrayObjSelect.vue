<template>
  <el-select
    placeholder="请选择"
    size="mini"
    :value="value"
    :popper-append-to-body="false"
    @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArrayObjSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('handleSelectValue', val)
    }
  }
}
</script>
