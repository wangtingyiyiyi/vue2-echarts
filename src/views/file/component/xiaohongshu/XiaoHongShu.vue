<template>
  <div>
    <Title class="m-b-12" title="提取品牌"/>
    <Brand-Tags @handleSelectBrand="handleSelectBrand"/>
    <Type-Buttons
      class="m-b-24"
      :buttons="XIAOHONGSHU_BUTTONS"
      :activedType="currentPartComponent"
      @handleChangeActiveType="handleChangeActiveType"/>
    <component
      :is="currentPartComponent"
      @setPreveiwParam="setPreveiwParam"
      @setExcelHeader="setExcelHeader"></component>
    <Preview-Table-Title
      :tableTotal="tableTotal"
      :exportDisabled="showDownloadBtn"
      @handleExportExcel="handleExportExcel"/>
    <div class="text-second" v-if="brandList.length === 0">请选择品牌</div>
    <Preview-Table
      v-if="previewData.length !== 0 && brandList.length !== 0"
      :tableTotal="tableTotal"
      :tableData="previewData"
      :excelHeader="excelHeader"/>
    <Download-Button
      v-if="showDownloadBtn"
      :loadingProgress="loadingProgress"/>
  </div>
</template>

<script>
import componentMixin from '@/views/file/component/xiaohongshu/component.js'
import { XIAOHONGSHU_BUTTONS, XIAOHONGSHU_STAT_EXCEL_HEADER } from '@/utils/const.js'
import { getXhsPreview } from '@/api/file.js'
export default {
  name: 'XiaoHongShu',
  mixins: [componentMixin],
  data () {
    return {
      XIAOHONGSHU_BUTTONS,
      currentPartComponent: 'Stat',
      brandList: [],
      tableTotal: 10,
      showDownloadBtn: false,
      excelHeader: XIAOHONGSHU_STAT_EXCEL_HEADER,
      formType: {
        Stat: 'statistics',
        Info: 'info'
      },
      formParam: {
        range: 'all',
        particle: 'month',
        agg: ['brand', 'kolName'],
        type: 'statistics'
      },
      previewData: [],
      loadingProgress: 0
    }
  },
  methods: {
    handleChangeActiveType (activedTab) {
      this.currentPartComponent = activedTab
    },
    handleSelectBrand (brandList) {
      this.brandList = brandList
      this.getInfoPreviewTable()
      this.getStatPreviewTable()
    },
    setPreveiwParam (form) {
      console.info(form)
      this.formParam = form
      this.getInfoPreviewTable()
      this.getStatPreviewTable()
    },
    handleExportExcel () {},
    setExcelHeader (header) {
      this.excelHeader = header
    },
    async getStatPreviewTable () {
      if (this.currentPartComponent !== 'Stat' || this.brandList.length === 0) return
      console.info('获取统计预览')
      const res = await getXhsPreview(Object.assign({ dataList: this.brandList }, this.formParam))
      if (res.code === 200) {
        this.previewData = res.result
      }
    },
    getInfoPreviewTable () {
      if (this.currentPartComponent !== 'Info') return
      console.info('获取详情预览')
    }
  }
}
</script>
