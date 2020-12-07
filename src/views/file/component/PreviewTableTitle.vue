<template>
  <div class="flex-between-row m-t-35 m-b-12">
    <div class="flex-row">
      <Title title="导出预览" backgroundColor="#5AD8A6"/>
      <div class="text-second m-l-18" v-if="tableTotal !== 0">当前共有{{tableTotal | format}}条数据</div>
      <div class="text-second" v-if="tableTotal > max">，</div>
      <div :style="{color: errorColor}" v-if="tableTotal > max">已超出最大限制数量({{max | format}})</div>
    </div>
    <ExportButton
      v-if="showButton"
      :svgName="isDisabled ? 'exportingNot' : 'exporting'"
      :isDisabled="isDisabled"
      @handleExportExcel="handleExportExcel"/>
  </div>
</template>

<script>
import ExportButton from '@/components/ExportButton.vue'
export default {
  name: 'PreviewTableTitle',
  components: { ExportButton },
  props: {
    tableTotal: {
      type: Number,
      default: 0
    },
    exportDisabled: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 1048576
    },
    showButton: {
      type: Boolean,
      default: true
    },
    errorColor: {
      type: String,
      default: '#f56c6c'
    }
  },
  computed: {
    isDisabled () {
      return this.exportDisabled || this.tableTotal === 0 || this.tableTotal > this.max
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
  width 700px
  justify-content space-between
  align-items center

.flex-row
  display flex
  width 100%
  align-items normal
</style>
