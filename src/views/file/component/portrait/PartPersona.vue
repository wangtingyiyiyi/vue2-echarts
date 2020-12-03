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
          formKey="uv"
          :activeVal="form.uv"
          :options="UV_GROUP"
          @handleClick="handleForm"
          @handleOnExcelHeader="handleExcelHeader" />
      </el-form-item>
      <el-form-item label="画像维度" style="height: 28px;">
        <Group-Checkbox
          formKey="personaAgg"
          :activeVal="form.personaAgg"
          :options="PORTRAIT_LEVEL"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import GroupCheckbox from '@/components/GroupCheckbox.vue'

import { RANGE_LEVEL, GROUP_LEVEL, UV_GROUP, PORTRAIT_LEVEL, PERSONA_EXCEL_HEADER } from '@/utils/const.js'
export default {
  name: 'Persona',
  components: { GroupCheckbox },
  data () {
    return {
      form: {
        range: 'all',
        particle: 'month',
        uv: 'shop',
        personaAgg: [],
        type: 'persona'
      },
      GROUP_LEVEL,
      RANGE_LEVEL,
      UV_GROUP,
      PORTRAIT_LEVEL,
      PERSONA_EXCEL_HEADER,
      headerObj: {
        particle: ['月'],
        uvAgg: ['店铺'],
        personaAgg: []
      }
    }
  },
  methods: {
    handleForm (k, v) {
      this.form[k] = v
    },
    handleExcelHeader (k, v) {
      this.headerObj[k] = v
      const values = Object.values(this.headerObj).flat()
      const excelHeader = PERSONA_EXCEL_HEADER.filter(item => {
        return values.indexOf(item.label) !== -1
      })
      this.form.uvAgg = this.form.uv.split()

      this.$nextTick(() => {
        this.$emit('setPreveiwParam', this.form)
        this.$emit('setExcelHeader', excelHeader)
      })
    }
  }
}
</script>
