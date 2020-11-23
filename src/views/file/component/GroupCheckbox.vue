<template>
  <div class="flex-row m-b-12">
    <div style="width: 90px" class="label">{{label}}</div>
    <el-checkbox-group v-model="val" @change="handleGroup">
      <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item"
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
      val: [],
      currentCheckedAgg: {}
    }
  },
  mounted () {
    this.deCode()
  },
  methods: {
    handleCurrent (val, item) {
      // if (item.label === '按品牌') {
      //   this.currentCheckedAgg = item
      //   return
      // }
      // val ? this.currentCheckedAgg = item : this.currentCheckedAgg = {}
    },
    handleGroup (arr) {
      const val = arr.map(item => item.industryWeights)
      this.$emit('handleOnGroupCheckbox', this.formKey, replenishSum(val, this.codeLen))
    },
    // 将传入的默认值进行解码
    deCode () {
      let sum = parseInt(this._.cloneDeep(this.activeVal))
      const weight = []
      for (let index = 0; index < this.codeLen; index++) {
        if (parseInt(sum / Math.pow(10, index)) > 0) {
          weight.push(Math.pow(10, index))
        }
        sum = sum - Math.pow(10, index)
      }
      this.val = this.options.filter(item => {
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
