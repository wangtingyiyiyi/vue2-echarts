<template>
  <el-select v-model="month" placeholder="请选择" @change="handleChange">
    <el-option
      v-for="item in monthOption"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
</template>

<script>
import { mockMonthOption } from '@/mock.js'
export default {
  name: 'MonthOptions',
  data () {
    return {
      month: '',
      monthOption: mockMonthOption
    }
  },
  methods: {
    handleChange (val) {
      console.info(val)
    }
  }
}
</script>
