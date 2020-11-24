<template>
  <div class="flex-row m-b-12">
    <div style="width: 90px" class="label">{{label}}</div>
    <el-checkbox-group v-model="array" @change="handleGroup">
      <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item"
        :disabled="item.disabled"
        @change="val => handleCurrent(val, item)">{{item.label}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import { replenishSum } from '@/utils/common.js'

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
    codeLen: {
      type: Number,
      defult: 4
    },
    activeVal: {
      type: String,
      default: '0000'
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
        // console.log('监控多选', params)
        this.deCode()
      }
    }
  },
  mounted () {
    this.deCode()
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
      const val = this.array.map(item => item.industryWeights)
      const industryExcelHeader = this.array.map(item => item.industryExcelHeader).flat()
      this.$emit('handleOnExcelHeader', this.formKey, industryExcelHeader)
      this.$emit('handleOnGroupCheckbox', this.formKey, replenishSum(val, this.codeLen))
    },
    // 将传入的默认值进行解码
    deCode () {
      let sum = parseInt(this._.cloneDeep(this.activeVal))
      const max = sum.toString().length
      const weight = []
      for (let index = max - 1; index >= 0; index--) {
        if (parseInt(sum / Math.pow(10, index)) >= 1) {
          weight.push(Math.pow(10, index))
          sum = sum - Math.pow(10, index)
        }
      }
      this.array = this.options.filter(item => {
        return weight.includes(item.industryWeights)
      })
    }
  }
}
</script>

<style lang="stylus">
.label
  color #606266
</style>
