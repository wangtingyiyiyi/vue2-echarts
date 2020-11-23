<template>
  <el-radio-group v-model="val">
    <el-radio
      v-for="item in options"
      :key="item.value"
      size="mini"
      @change="rangeClick"
      :label="item.value">{{item.label}}</el-radio>
  </el-radio-group>
</template>

<script>

export default {
  name: 'GroupRadio',
  props: {
    activeVal: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    formKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      val: this.activeVal
    }
  },
  methods: {
    rangeClick (val) {
      this.$emit('handleOnGroupRadio', this.formKey, val)
    }
  }
}
</script>
