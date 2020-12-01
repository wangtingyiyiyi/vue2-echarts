<template>
  <div class="flex-between-row m-t-35">
    <div class="flex-row">
      <Title title="导出预览" backgroundColor="#5AD8A6"/>
      <div class="text-second m-l-18" v-if="tableTotal !== 0">当前共有{{tableTotal | format}}条数据</div>
      <div class="text-second" v-if="tableTotal > max">，</div>
      <div class="text-warning" v-if="tableTotal > max">已超出Excel的最大行数({{max | format}})</div>
    </div>
    <el-button
      type="primary"
      size="mini"
      v-if="!(exportDisabled || tableTotal === 0 || tableTotal > max)"
      @click="handleExportExcel" >导出</el-button>
  </div>
</template>

<script>
export default {
  name: 'PreviewTableTitle',
  props: {
    tableTotal: {
      type: Number,
      default: 0
    },
    exportDisabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      max: 1048576
    }
  },
  methods: {
    handleExportExcel () {
      this.$emit('handleExportExcel')
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-between-row
  display flex
  width: 100%
  justify-content space-between
  align-items center

.flex-row
  display flex
  width 100%
  align-items normal
</style>
