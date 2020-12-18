<template>
  <div>
  </div>
</template>

<script>
import { XIAOHONGSHU_INFO_EXCEL_HEADER } from '@/utils/const.js'
export default {
  name: 'PartInfo',
  data () {
    return {
      XIAOHONGSHU_INFO_EXCEL_HEADER
    }
  },
  mounted () {
    this.$emit('setExcelHeader', XIAOHONGSHU_INFO_EXCEL_HEADER)
    this.$emit('setPreveiwParam', { type: 'detail' })
  }
}
</script>
