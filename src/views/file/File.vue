<template>
  <div class="file-tab-wapper">
    <el-tabs v-model="activeTab" @tab-click="handleTabClick" lazy>
      <el-tab-pane label="行业提数" name="industry">
        <Title class="m-b-12" title="筛选配置"/>
        <el-form ref="form" :model="form" label-width="100px" label-position="left" size="mini">
          <el-form-item label="目标行业">
            <Industry-Select-Tree
              style="width: 500px"
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
      </el-tab-pane>
      <el-tab-pane label="品牌提数" name="brand">
        <Title class="m-b-12" title="筛选配置"/>
        <el-form ref="form" :model="form" label-width="100px" label-position="left" size="mini">
          <el-form-item label="搜索品牌">
            <el-select
              v-model="form.brandList"
              multiple
              remote
              filterable
              value-key="brand"
              popper-class="brand-select-option-class"
              style="width: 600px"
              :remote-method="getBrandSearch"
              :loading="loading"
              @change="handleChangeBrand">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index + item"
                :value="item"
                :label="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业筛选">
            <el-cascader
              style="width: 600px"
              ref="cascader"
              popper-class="file-cascader-wapper"
              v-model="form.cate"
              :options="categoryOption"
              :show-all-levels="false"
              :props="props">
              <template slot-scope="{ node, data }">
                <div @click="changeIndustry(data)">{{data.category}}</div>
              </template>
            </el-cascader>
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
      </el-tab-pane>
      <el-tab-pane label="人群画像" name="portrait">
        <Tab-For-Portrait />
      </el-tab-pane>
    </el-tabs>
    <Download-Button
      v-if="showDownloadBtn"
      v-permission
      :loadingProgress="loadingProgress"/>
  </div>
</template>

<script>
import componentsMixin from '@/views/file/component.js'
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
import { previewExcel } from '@/api/download'
import { INDUSTRY_EXCEL_TABLE_PROP, INDUSTRY_DEFAULT_INDUSTRY, BRAND_DEFINE_BRANDLIST } from '@/utils/const.js'
import { downloadFile, resetChildrenByIsLeaf } from '@/utils/common.js'
import permission from '@/utils/directives/permission.js' // 权限判断指令
import downloadCallbackMixin from '@/utils/mixin/downloadCallback.js'

export default {
  name: 'File',
  mixins: [componentsMixin, downloadCallbackMixin],
  directives: { permission },
  data () {
    return {
      activeTab: 'portrait',
      form: {
        cate: INDUSTRY_DEFAULT_INDUSTRY.label,
        cateList: [INDUSTRY_DEFAULT_INDUSTRY],
        brandList: [],
        range: 'one_year',
        particle: 'month',
        cateFlat: '111',
        agg: '0000',
        indicator: '0111'
      },
      loading: false,
      tableData: [],
      tableTotal: 0,
      excelHeader: [],
      brandOption: [],
      categoryOption: [],
      INDUSTRY_EXCEL_TABLE_PROP,
      emptyMes: '请设置提数配置',
      INDUSTRY_DEFAULT_INDUSTRY,
      showDownloadBtn: false,
      loadingProgress: 0,
      categoryObj: INDUSTRY_DEFAULT_INDUSTRY,
      isLoading: false,
      BRAND_DEFINE_BRANDLIST
    }
  },
  mounted () {
    this.handleRoute()
  },
  methods: {
    handleRoute () {
      const { query } = this.$route
      if (Object.keys(query).length !== 0) {
        this.form.cateList = [JSON.parse(query.cateList)]
        this.form.brandList = JSON.parse(query.brandList)
        this.form.cate = JSON.parse(query.cateList).category
        this.activeTab = query.activeTab
        this.categoryObj = JSON.parse(query.cateList)
        this.getCategoryByBrands()
      }
    },
    handleTabClick () {
      this.tableData = []
      this.tableTotal = 0
      this.emptyMes = '请设置提数配置'
      this.form = {
        cate: '',
        cateList: this.activeTab === 'industry' ? [INDUSTRY_DEFAULT_INDUSTRY] : [],
        brandList: this.activeTab === 'brand' ? BRAND_DEFINE_BRANDLIST : [],
        range: 'one_year',
        particle: 'month',
        cateFlat: '111',
        agg: '0000',
        indicator: '0111'
      }
      this.headerObj = {
        particle: ['月'],
        cateFlat: ['一级品类', '二级品类', '三级品类'],
        agg: [],
        indicator: ['销量', 'ASP', 'GMV']
      }
      this.getCategoryByBrands().then(() => {
        if (this.activeTab === 'brand') {
          this.form.cate = this.categoryOption[0].category
          this.form.cateList = [this.categoryOption[0]]
        }
      })
    },
    handleSelectTree (data) {
      this.form.cate = data.category
      this.form.cateList = [data]
      this.handlePreview()
    },
    handleForm (k, v) {
      this.form[k] = v
      this.handlePreview()
    },
    changeIndustry (data) {
      this.form.cate = data.category
      this.form.cateList = [Object.assign(this._.cloneDeep(data), { children: null })]
      this.$refs.cascader.dropDownVisible = false
      this.handlePreview()
    },
    handleExcelHeader (k, v) {
      this.headerObj[k] = v
      const values = Object.values(this.headerObj).flat()
      this.excelHeader = INDUSTRY_EXCEL_TABLE_PROP.filter(item => {
        return values.indexOf(item.label) !== -1
      })
    },
    handleChangeBrand () {
      this.getCategoryByBrands()
      this.handlePreview()
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
    // 品牌列表模糊查询
    async getBrandSearch (query) {
      if (query) {
        this.loading = true
        const res = await getBrandByLikeCondition({ likeCondition: query })
        this.brandOption = []
        this.loading = false
        if (res.code === 200) {
          this.brandOption = res.result
        } else {
          this.$message.error('品牌列表搜索失败')
          this.brandOption = []
        }
      } else {
        this.brandOption = []
      }
    },
    // 根据品牌查询行业分类
    async getCategoryByBrands () {
      const res = await getCategorytByBrand({ brandList: this.form.brandList })
      if (res.code === 200) {
        resetChildrenByIsLeaf(res.result)
        this.categoryOption = res.result
      } else {
        this.$message.error('品牌分类请求失败')
        this.categoryOption = []
      }
    },
    // 提数接口
    handleExportExcel () {
      const brandName = this.form.brandList.length ? `(${this.form.brandList.join('_')})` : ''
      const filename = `Tmall_${this.form.cate}${brandName}_${this.$moment(new Date()).format('YYYYMMDD')}`
      const option = {
        param: this.form,
        url: process.env.VUE_APP_API_URL + '/download/file',
        filename: filename,
        onprogress: this.onprogress,
        onreadystatechange: this.onreadystatechange
      }
      this.showDownloadBtn = true
      downloadFile(option)
    }
  }
}
</script>

<style lang="stylus" scoped>
.file-tab-wapper
  background-color #ffffff
  position relative
  min-height calc(100vh - 167px)

.file-tab-wapper >>> .el-tabs__item
    padding-left 25px !important
    font-size 16px
    line-height 56px
    height 56px

.flex-between-row
  display flex
  width: 100%
  justify-content space-between
  align-items center
</style>
