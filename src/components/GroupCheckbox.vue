<template>
  <el-checkbox-group v-model="array" @change="handleGroup">
    <el-checkbox
      v-for="item in options"
      :key="item.value"
      :label="item"
      :disabled="item.disabled"
      style="width: 80px"
      @change="val => handleCurrent(val, item)">{{item.label}}</el-checkbox>
  </el-checkbox-group>

</template>

<script>
export default {
  name: 'GroupCheckbox',
  props: {
    label: {
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
    },
    activeVal: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      array: [],
      currentCheckedAgg: {}
    }
  },
  watch: {
    activeVal: {
      deep: true,
      handler: function (params) {
        this.init()
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleCurrent (val, item) {
      if (item.label === '按品牌') {
        this.currentCheckedAgg = item
        return
      }
      val ? this.currentCheckedAgg = item : this.currentCheckedAgg = {}
    },
    handleGroup (arr) {
      if (this.currentCheckedAgg.label === '按品名') {
        arr.push(this.options[0])
        this.array = this._.uniqBy(arr, 'label')
      }
      if (this.currentCheckedAgg.label === '按品牌') {
        this.array = this._.remove(arr, item => item.label !== '按品名')
      }
      const excelHeader = this.array.map(item => item.excelHeader).flat()
      this.$emit('handleOnExcelHeader', this.formKey, excelHeader)
    },
    init () {
      this.array = this.options.filter(item => {
        return this.activeVal.includes(item.value)
      })
    }
  }
}
</script>
