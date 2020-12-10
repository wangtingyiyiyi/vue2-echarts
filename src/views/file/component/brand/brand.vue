<template>
  <div>
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
  BRAND_DEFINE_BRANDLIST
} from '@/utils/const.js'
import componentMixin from '@/views/file/component/brand/component.js'
import { previewExcel } from '@/api/download'
import { resetChildrenByIsLeaf } from '@/utils/common.js'
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'

export default {
  name: 'Brand',
  mixins: [componentMixin],
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
        cate: '',
        cateList: [],
        brandList: BRAND_DEFINE_BRANDLIST,
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
      loading: false,
      brandOption: {},
      categoryOption: [],
      props: {
        value: 'category',
        emitPath: false,
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      excelHeader: {},
      headerObj: {
        particle: ['月'],
        cateFlat: ['一级品类', '二级品类', '三级品类'],
        agg: [],
        indicator: ['销量', 'ASP', 'GMV']
      }
    }
  },
  mounted () {
    this.getCategoryByBrands().then(() => {
      this.form.cate = this.categoryOption[0].category
      this.form.cateList = [this.categoryOption[0]]
    })
  },
  methods: {
    changeIndustry (data) {
      this.form.cate = data.category
      this.form.cateList = [Object.assign(this._.cloneDeep(data), { children: null })]
      this.$refs.cascader.dropDownVisible = false
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
      const brandName = `(${this.form.brandList.join('_')})`
      const filename = `Tmall_${this.form.cate}${brandName}_${this.$moment(new Date()).format('YYYYMMDD')}`
      const option = {
        param: Object.assign(form, this.form),
        url: process.env.VUE_APP_API_URL + '/download/file?action=brand',
        filename: filename
      }
      this.$emit('exportExcel', option)
    },
    handleChangeBrand () {
      this.getCategoryByBrands()
      this.handlePreview()
    },
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
    }
  }
}
</script>
