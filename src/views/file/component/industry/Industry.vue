<template>
  <div>
    <Title class="m-b-12" title="筛选配置"/>
    <el-form ref="form" :model="form" label-width="100px" label-position="left" size="mini">
      <el-form-item label="目标行业">
        <Industry-Select-Tree
          style="width: 600px"
          :defaultObj="categoryObj"
          @handleSelectTree="handleSelectTree"/>
      </el-form-item>
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
      <el-form-item label="品类展开" style="height: 28px;">
        <Group-Checkbox
          formKey="cateFlat"
          :codeLen="3"
          :activeVal="form.cateFlat"
          :options="CATEGORY_LEVEL"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
      <el-form-item label="品类聚合" style="height: 28px;">
        <Group-Checkbox
          formKey="agg"
          :codeLen="4"
          :activeVal="form.agg"
          :options="CATEGORT_GROUP"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
      <el-form-item label="数据指标" style="height: 28px;">
        <Group-Checkbox
          formKey="indicator"
          :codeLen="4"
          :activeVal="form.indicator"
          :options="DATA_INDEX"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
      </el-form-item>
    </el-form>
    <Preview-Table-Title
      :tableTotal="tableTotal"
      :exportDisabled="showDownloadBtn"
      @handleExportExcel="handleExportExcel"/>
    <Preview-Table
      v-if="tableData.length"
      :excelHeader="excelHeader"
      :tableData="tableData"/>
    <div v-if="emptyMes" class="text-second">{{emptyMes}}</div>
    <Preview-Loading v-if="isLoading"/>
    <div style="background-color: red; position: fixed; top: 10vh">

    </div>
    <Drawer
      v-permission
      :visible="drawerShow"
      ref="industryDrawer"
      class="industry-drawer"
      @handleDrawerClose="handleDrawerClose">
      <Drawer-Button
        slot="button"
        :drawerShow="drawerShow"
        @handleDrawerBtn="handleDrawerBtn"/>
      <Drawer-Content
        :drawerShow="drawerShow"
        @handleDefineSearch="handleDefineSearch"/>
    </Drawer>
  </div>
</template>

<script>
import {
  RANGE_LEVEL,
  GROUP_LEVEL,
  CATEGORY_LEVEL,
  CATEGORT_GROUP,
  DATA_INDEX,
  INDUSTRY_EXCEL_TABLE_PROP,
  INDUSTRY_DEFAULT_INDUSTRY
} from '@/utils/const.js'
import componentMixin from '@/views/file/component/industry/component.js'
import { previewExcel } from '@/api/download'
import permission from '@/utils/directives/permission.js' // 权限判断指令

export default {
  name: 'Industry',
  mixins: [componentMixin],
  directives: { permission },
  props: {
    showDownloadBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      RANGE_LEVEL,
      GROUP_LEVEL,
      CATEGORY_LEVEL,
      CATEGORT_GROUP,
      DATA_INDEX,
      INDUSTRY_EXCEL_TABLE_PROP,
      form: {
        cate: INDUSTRY_DEFAULT_INDUSTRY.label,
        cateList: [INDUSTRY_DEFAULT_INDUSTRY],
        brandList: null,
        range: 'one_year',
        particle: 'month',
        cateFlat: '111',
        agg: '0000',
        indicator: '0111'
      },
      tableTotal: 0,
      tableData: [],
      emptyMes: '请设置提数配置',
      isLoading: false,
      categoryObj: INDUSTRY_DEFAULT_INDUSTRY,
      headerObj: {
        particle: ['月'],
        cateFlat: ['一级品类', '二级品类', '三级品类'],
        agg: [],
        indicator: ['销量', 'ASP', 'GMV']
      },
      drawerShow: false
    }
  },
  methods: {
    handleSelectTree (data) {
      this.form.cate = data.category
      this.form.cateList = [data]
      this.handlePreview()
    },
    handleForm (k, v) {
      this.form[k] = v
      this.handlePreview()
    },
    handleExcelHeader (k, v) {
      this.headerObj[k] = v
      const values = Object.values(this.headerObj).flat()
      this.excelHeader = INDUSTRY_EXCEL_TABLE_PROP.filter(item => {
        return values.indexOf(item.label) !== -1
      })
    },
    handleExportExcel (form) {
      // const brandName = this.form.brandList.length ? `(${this.form.brandList.join('_')})` : ''
      // const filename = `Tmall_${this.form.cate}${brandName}_${this.$moment(new Date()).format('YYYYMMDD')}`
      const filename = `Tmall_${this.form.cate}_${this.$moment(new Date()).format('YYYYMMDD')}`
      const option = {
        param: Object.assign(form, this.form),
        url: process.env.VUE_APP_API_URL + '/download/file?action=category',
        filename: filename
      }
      this.$emit('exportExcel', option)
    },
    async handlePreview () {
      this.emptyMes = ''
      if (this.form.agg === 'undefined' || this.form.agg === '0000') {
        this.emptyMes = '请至少选择一种品类聚合类型'
        this.tableData = []
        this.tableTotal = 0
        return
      }
      this.isLoading = true
      this.tableData = []
      this.tableTotal = 0
      const res = await previewExcel(this.form)
      this.isLoading = false
      if (res.code === 200) {
        this.tableData = res.result
        this.tableTotal = res.total
        this.emptyMes = ''
      } else {
        this.tableData = []
        this.tableTotal = 0
        this.emptyMes = 'Excel预览数据请求失败'
      }
    },
    handleDefineSearch (p) {
      this.form.cate = p.label
      const obj = {
        rank: p.rank,
        label: p.label,
        category: p.label,
        defineId: p.id
      }
      this.form.cateList = [obj]
      this.categoryObj = obj
      this.handleDrawerClose(false)
      this.handlePreview()
    },
    // 高级搜索 弹出抽屉
    handleDrawerBtn () {
      this.drawerShow = !this.drawerShow
    },
    // 抽屉关闭
    handleDrawerClose (value) {
      this.drawerShow = value
    }
  }
}
</script>

<style lang="stylus" scoped>
.industry-drawer
  height 100vh
  position fixed
  right 0
  top 0
  z-index 2000
</style>
