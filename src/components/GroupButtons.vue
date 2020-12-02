<template>
  <div class="flex-row m-b-12">
    <el-button-group v-model="val">
      <el-button
        v-for="item in options"
        :key="item.value"
        @click="handleClick(item.value)"
        :type="activeVal === item.value ? 'primary' : ''">{{item.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'GroupButtons',
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
        this.val = params
      }
    }
  },
  methods: {
    handleClick (val) {
      const excelHeader = this._.find(this.options, function (item) {
        return item.value === val
      }).excelHeader || []
      this.$emit('handleOnGroupButtons', this.formKey, val)
      this.$emit('handleOnExcelHeader', this.formKey, excelHeader)
    }
  }
}
</script>
