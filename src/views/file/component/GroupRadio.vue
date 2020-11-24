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
  watch: {
    activeVal: {
      deep: true,
      handler: function (params) {
        // console.log('监控单选', params)
        this.val = params
      }
    }
  },
  methods: {
    rangeClick (val) {
      const industryExcelHeader = this._.find(this.options, function (item) {
        return item.value === val
      }).industryExcelHeader || []
      this.$emit('handleOnGroupRadio', this.formKey, val)
      this.$emit('handleOnExcelHeader', this.formKey, industryExcelHeader)
    }
  }
}
</script>
