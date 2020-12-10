<template>
  <div>
    <Title class="m-b-12" title="提取店铺"/>
    <Shop-Tags @handleSelectShop="handleSelectShop"/>
    <el-divider></el-divider>
    <Type-Buttons
      class="m-b-24"
      :activedType="currentPartComponent"
      @handleChangeActiveType="handleChangeActiveType"/>
    <component
      :is="currentPartComponent"
      :shopList="shopList"
      :activedTab="currentPartComponent"
      :tableTotal="tableTotal"
      :max="500000"
      :exportDisabled="showDownloadBtn"
      @reloadPreview="reloadPreview"
      @setPreveiwParam="setPreveiwParam"
      @handleExportExcel="handleExportExcel"
      @setExcelHeader="setExcelHeader"></component>
    <Preview-Table-Title
      :showButton="currentPartComponent === 'Phone' ? false : true"
      :tableTotal="tableTotal"
      :max="500000"
      :exportDisabled="showDownloadBtn"
      @handleExportExcel="handleExportExcel"/>
    <div class="text-second" v-if="emptyMes">{{emptyMes}}</div>
    <Preview-Loading v-if="isLoading"/>
    <Preview-Table
      v-if="previewData.length !== 0"
      :tableTotal="tableTotal"
      :tableData="previewData"
      :excelHeader="headerObj[currentPartComponent]"/>
    <Download-Button
      v-if="showDownloadBtn"
      :loadingProgress="loadingProgress"/>
  </div>
</template>

<script>
import { getShopPreview } from '@/api/shop.js'
import { downloadFile } from '@/utils/common.js'
import { PHONE_EXCEL_HEADER, MUA_EXCEL_HEADER, OPERATOR_BUTTONS } from '@/utils/const.js'
import { mapState } from 'vuex'
import PortraitComponentsMixin from '@/views/file/component/portrait/component.js'
import downloadCallbackMixin from '@/utils/mixin/downloadCallback.js'
import DialogForDownload from '@/views/file/component/DialogForDownload.vue'
export default {
  name: 'TabForPortrait',
  mixins: [downloadCallbackMixin, PortraitComponentsMixin],
  watch: {
    currentTabPane: {
      handler: function (params) {
        this.shopList = []
        this.previewData = []
        this.tableTotal = 0
      }
    }
  },
  computed: {
    ...mapState('file', ['currentTabPane'])
  },
  components: { DialogForDownload },
  data () {
    return {
      currentPartComponent: 'Phone',
      shopList: [],
      previewData: [],
      tableTotal: 0,
      previewParam: {
        particle: 'month',
        range: 'all',
        uvAgg: ['shop'],
        personaAgg: [],
        type: ''
      },
      headerObj: {},
      emptyMes: '请添加店铺',
      isLoading: false,
      showDownloadBtn: false,
      loadingProgress: 0,
      OPERATOR_BUTTONS
    }
  },
  mounted () {
    this.initHeader()
  },
  methods: {
    handleSelectShop (shopList) {
      this.shopList = shopList
      this.previewParam.type = this.currentPartComponent.toLowerCase()
      this.handlePreview()
    },
    setExcelHeader (arr) {
      this.headerObj[this.currentPartComponent] = arr
    },
    setPreveiwParam (param) {
      this.previewParam = param
      this.handlePreview()
    },
    handleChangeActiveType (activeTab) {
      this.currentPartComponent = activeTab
      this.previewParam = {
        particle: 'month',
        range: 'all',
        uvAgg: ['shop'],
        personaAgg: [],
        type: activeTab.toLowerCase()
      }
      this.emptyMes = '请添加店铺'
      this.initHeader()
      this.handlePreview()
      this.$nextTick(() => {
        this.$bus.$emit('fileChangeSelectedShop', this.shopList)
      })
    },
    initHeader () {
      this.headerObj = {
        Phone: this.handleExcelHeader(PHONE_EXCEL_HEADER),
        Persona: [],
        Mau: this.handleExcelHeader(MUA_EXCEL_HEADER)
      }
    },
    handleExcelHeader (options) {
      const values = ['月']
      const excelHeader = options.filter(item => {
        return values.indexOf(item.label) !== -1 || item.common
      })
      return excelHeader
    },
    reloadPreview (tableData) {
      this.shopList = tableData
      this.handlePreview()
    },
    // 提数接口
    handleExportExcel (form) {
      const label = OPERATOR_BUTTONS.filter(item => item.value === this.currentPartComponent)[0].label
      const filename = `${label}_${this.$moment(new Date()).format('YYYYMMDD')}`
      const option = {
        param: Object.assign(this.previewParam, { shopList: this.shopList }, form),
        url: process.env.VUE_APP_API_URL + '/download/shop/file?action=persona',
        filename: filename,
        onprogress: this.onprogress,
        onreadystatechange: this.onreadystatechange,
        fileType: this.currentPartComponent === 'Phone' ? '.txt' : '.xlsx'
      }
      this.showDownloadBtn = true
      downloadFile(option)
    },
    async handlePreview () {
      this.emptyMes = ''
      this.previewData = []
      this.tableTotal = 0
      if (this.shopList.length === 0) {
        this.emptyMes = '请添加店铺'
        return
      }
      if (this.previewParam.type === 'persona' && this.previewParam.personaAgg.length === 0) {
        this.emptyMes = '请选择一种画像维度'
        return
      }
      this.isLoading = true
      const res = await getShopPreview(Object.assign(this.previewParam, { shopList: this.shopList }))
      this.isLoading = false
      if (res.code === 200) {
        this.previewData = res.result
        this.tableTotal = res.total
      }
    }
  }
}
</script>
