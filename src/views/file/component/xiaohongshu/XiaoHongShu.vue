<template>
  <div>
    <Brand-Tags
      :isLoading="isLoading"
      @handleCheckRules="handleCheckRules"/>
    <!-- <Type-Buttons
      class="m-b-24"
      :buttons="XIAOHONGSHU_BUTTONS"
      :activedType="currentPartComponent"
      @handleChangeActiveType="handleChangeActiveType"/> -->
    <el-radio-group v-model="currentPartComponent" class="m-b-24">
      <el-radio
        v-for="item in XIAOHONGSHU_BUTTONS"
        :key="item.value"
        :label="item.value"
        @change="handleChangeActiveType">{{item.label}}</el-radio>
    </el-radio-group>
    <component
      :is="currentPartComponent"
      @setPreveiwParam="setPreveiwParam"
      @setExcelHeader="setExcelHeader"></component>
    <Preview-Table-Title
      width="1138px"
      :tableTotal="tableTotal"
      :exportDisabled="showDownloadBtn"
      @handleExportExcel="handleExportExcel"/>
    <div class="text-second" v-if="emptyMess">{{emptyMess}}</div>
    <Preview-Loading v-if="isLoading"/>
    <Preview-Table
      v-if="previewData.length !== 0"
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
import { XIAOHONGSHU_BUTTONS } from '@/utils/const.js'
import { getXhsPreview, getXhsPreviewCount } from '@/api/file.js'
import { downloadFile } from '@/utils/common.js'
import downloadCallbackMixin from '@/utils/mixin/downloadCallback.js'

export default {
  name: 'XiaoHongShu',
  mixins: [componentMixin, downloadCallbackMixin],
  data () {
    return {
      XIAOHONGSHU_BUTTONS,
      currentPartComponent: 'Stat',
      rulesList: [],
      tableTotal: 0,
      showDownloadBtn: false,
      excelHeader: [],
      formParam: {},
      previewData: [],
      loadingProgress: 0,
      isLoading: false,
      emptyMess: '请配置小红书导数规则',
      typeInfo: {
        Info: '详情',
        Stat: '统计'
      }
    }
  },
  methods: {
    handleChangeActiveType (activedTab) {
      this.currentPartComponent = activedTab
    },
    setExcelHeader (header) {
      this.excelHeader = header
    },
    handleCheckRules (rulesList) {
      this.rulesList = rulesList
      this.getTotal().then(() => {
        this.getStatPreviewTable()
      })
    },
    setPreveiwParam (form) {
      this.formParam = form
      this.getTotal().then(() => {
        this.getStatPreviewTable()
      })
    },
    handleExportExcel (form) {
      const brandName = this.rulesList.map(item => item.brand).join('|')
      const filename = `小红书_(${brandName})_${this.typeInfo[this.currentPartComponent]}_${this.$moment(new Date()).format('YYYYMMDD')}`
      const option = {
        param: Object.assign(form, this.formParam, { dataList: this.rulesList }),
        url: process.env.VUE_APP_API_URL + '/download/xhs?action=xhs',
        filename: filename,
        onprogress: this.onprogress,
        onreadystatechange: this.onreadystatechange
      }
      this.showDownloadBtn = true
      downloadFile(option)
    },
    async getStatPreviewTable () {
      if (this.rulesList.length === 0) return
      const res = await getXhsPreview(Object.assign({ dataList: this.rulesList }, this.formParam))
      this.isLoading = false
      if (res.code === 200) {
        this.previewData = res.result
        if (res.result.length === 0) {
          this.emptyMess = '请求到0条数据'
        }
      } else {
        this.emptyMess = '预览失败'
      }
    },
    async getTotal () {
      if (this.rulesList.length === 0) return
      this.tableTotal = 0
      this.emptyMess = ''
      this.previewData = []
      this.isLoading = true
      const res = await getXhsPreviewCount(Object.assign({ dataList: this.rulesList }, this.formParam))
      if (res.code === 200) {
        this.tableTotal = res.result || 0
      }
    }
  }
}
</script>
