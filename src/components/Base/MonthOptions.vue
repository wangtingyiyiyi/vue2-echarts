<template>
  <el-select :value="defaultMonth" placeholder="请选择" @change="handleChange" value-key="name">
    <el-option
      v-for="item in monthOption"
      :key="item.name"
      :label="item.name"
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
    defaultMonth: {
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
    handleChange (val) {
      console.info(val)
    }
  }
}
</script>
