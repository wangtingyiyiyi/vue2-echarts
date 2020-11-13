<template>
  <el-select :value="selectdMonth" class="sup-mini-select" placeholder="请选择" size="mini" @change="handleChange" value-key="name">
    <el-option
      v-for="item in monthOption"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MonthOptions',
  props: {
    monthOption: {
      type: Array,
      default: () => []
    },
    selectdMonth: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      month: {}
    }
  },
  methods: {
    // 正则去掉label中的 /
    setLable (label) {
      return label.replace(/\//, '')
    },
    handleChange (val) {
      this.$emit('handleSelectdMonth', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.sup-mini-select
  width 110px
  height 22px
  >>> .el-input
    height 22px
    .el-input__inner
      height 22px
      font-size 14px
    .el-input__icon
      height 19px
      line-height 19px

</style>
