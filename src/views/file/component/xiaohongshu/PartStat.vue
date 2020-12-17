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
      <el-form-item label="聚合" style="height: 28px;">
        <Group-Checkbox
          formKey="agg"
          :activeVal="form.agg"
          :options="XIAOHONGSHU_LEVEL"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import GroupCheckbox from '@/components/GroupCheckbox.vue'

import { RANGE_LEVEL, GROUP_LEVEL, XIAOHONGSHU_LEVEL, XIAOHONGSHU_STAT_EXCEL_HEADER } from '@/utils/const.js'
export default {
  name: 'PartStat',
  components: { GroupCheckbox },
  data () {
    return {
      form: {
        range: 'all',
        particle: 'month',
        agg: ['brand', 'kolName'],
        type: 'statistics'
      },
      GROUP_LEVEL,
      RANGE_LEVEL,
      XIAOHONGSHU_LEVEL,
      XIAOHONGSHU_STAT_EXCEL_HEADER,
      headerObj: {
        particle: ['月'],
        agg: ['KOL', '目标']
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
      const excelHeader = XIAOHONGSHU_STAT_EXCEL_HEADER.filter(item => {
        return values.indexOf(item.label) !== -1 || item.common
      })
      this.$nextTick(() => {
        this.$emit('setPreveiwParam', this.form)
        this.$emit('setExcelHeader', excelHeader)
      })
    }
  }
}
</script>
