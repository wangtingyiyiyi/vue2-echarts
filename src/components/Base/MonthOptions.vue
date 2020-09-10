<template>
  <el-select :value="selectdMonth" placeholder="请选择" size="mini" style="width: 150px" @change="handleChange" value-key="name">
    <el-option
      v-for="item in monthOption"
      :key="item.name"
      :label="setLable(item.name)"
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
      type: Object,
      default: () => {}
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
