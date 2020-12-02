<template>
  <div>
    <Title title="筛选配置"/>
    <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">
      <el-form-item label="时间范围" style="height: 28px;">
        <Group-Buttons
          :activeVal="form.range"
          formKey="range"
          :options="RANGE_LEVEL"
          @handleOnGroupButtons="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
      <el-form-item label="颗粒度" style="height: 28px;">
        <Group-Buttons
          :activeVal="form.particle"
          formKey="particle"
          :options="GROUP_LEVEL"
          @handleOnGroupButtons="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
      <el-form-item label="UV聚合" style="height: 28px;">
        <Group-Buttons
          :activeVal="form.uv"
          formKey="uv"
          :options="UV_GROUP"
          @handleOnGroupButtons="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import GroupButtons from '@/components/GroupButtons.vue'
import { RANGE_LEVEL, GROUP_LEVEL, UV_GROUP, PORTRAIT_ECXCEL_HEADER } from '@/utils/const.js'
export default {
  name: 'PartMau',
  components: { GroupButtons },
  data () {
    return {
      form: {
        range: 'all',
        particle: 'month',
        uv: 'shop'
      },
      GROUP_LEVEL,
      RANGE_LEVEL,
      UV_GROUP,
      PORTRAIT_ECXCEL_HEADER,
      headerObj: {}
    }
  },
  methods: {
    handleForm (k, v) {
      this.form[k] = v
    },
    handleExcelHeader (k, v) {
      this.headerObj[k] = v
      const values = Object.values(this.headerObj).flat()
      const excelHeader = PORTRAIT_ECXCEL_HEADER.filter(item => {
        return values.indexOf(item.label) !== -1
      })
      this.$emit('setExcelHeader', excelHeader)
    }
  }
}
</script>
