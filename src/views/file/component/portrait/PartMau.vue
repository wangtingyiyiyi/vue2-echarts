<template>
  <div>
    <Title title="筛选配置"/>
    <el-form ref="form" :model="form" label-width="100px" label-position="left" size="mini">
      <el-form-item label="时间维度" style="height: 28px;">
        <Button-Group
          formKey="range"
          :activeVal="form.range"
          :options="RANGE_LEVEL"
          @handleClick="handleForm"
          @handleOnExcelHeader="handleExcelHeader" />
      </el-form-item>
      <el-form-item label="时间粒度" style="height: 28px;">
        <Button-Group
          formKey="particle"
          :activeVal="form.particle"
          :options="GROUP_LEVEL"
          @handleClick="handleForm"
          @handleOnExcelHeader="handleExcelHeader" />
      </el-form-item>
      <el-form-item label="UV聚合" style="height: 28px;">
        <Button-Group
          formKey="uvAgg"
          :activeVal="form.uvAgg"
          :options="UV_GROUP"
          @handleClick="handleForm"
          @handleOnExcelHeader="handleExcelHeader" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { RANGE_LEVEL, GROUP_LEVEL, UV_GROUP, MUA_EXCEL_HEADER } from '@/utils/const.js'
export default {
  name: 'Mau',
  data () {
    return {
      form: {
        range: 'all',
        particle: 'month',
        uvAgg: 'shop',
        type: 'mau'
      },
      GROUP_LEVEL,
      RANGE_LEVEL,
      UV_GROUP,
      headerObj: {}
    }
  },
  methods: {
    handleForm (k, v) {
      this.form[k] = v
    },
    handleExcelHeader (k, v) {
      this.$emit('setExcelHeader', MUA_EXCEL_HEADER)
      const param = this._.cloneDeep(this.form)
      param.uvAgg = [this.form.uvAgg]
      this.$emit('setPreveiwParam', param)
    }
  }
}
</script>
