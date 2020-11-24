<template>
  <div class="file-tab-wapper">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="行业提数" name="industry">
        <Title class="m-b-12" title="筛选配置"/>
        <Industry-Select-Tree
          style="width: 500px"
          :defaultObj="categoryObj"
          @handleSelectTree="handleSelectTree"/>

        <div class="flex-row m-t-24">
          <div style="width: 300px">
            <Title class="m-b-12" title="选择时间范围"/>
            <Group-Radio
              :activeVal="form.range"
              formKey="range"
              :options="RANGE_LEVEL"
              @handleOnGroupRadio="handleForm"/>
          </div>
          <div>
            <Title class="m-b-12" title="选择颗粒度"/>
            <Group-Radio
              :activeVal="form.particle"
              formKey="particle"
              :options="GROUP_LEVEL"
              @handleOnGroupRadio="handleForm"
              @handleOnExcelHeader="handleExcelHeader"/>
          </div>
        </div>
        <Title class="m-t-24" title="高级配置" slotText="(多选)"/>
        <Group-Checkbox
          label="品类展开："
          :codeLen="3"
          :activeVal="form.cateFlat"
          formKey="cateFlat"
          :options="CATEGORY_LEVEL"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
        <Group-Checkbox
          label="品类聚合："
          :codeLen="4"
          formKey="agg"
          :activeVal="form.agg"
          :options="CATEGORT_GROUP"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
        <Group-Checkbox
          label="数据指标："
          :codeLen="4"
          :activeVal="form.indicator"
          formKey="indicator"
          :options="DATA_INDEX"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
        <div class="flex-between-row m-t-24">
          <div class="flex-row">
            <Title title="导出预览" backgroundColor="#5AD8A6"/>
            <div class="text-second m-l-18">当前共有{{tableTotal | format}}条数据</div>
            <div class="text-second" v-if="tableTotal > max">，</div>
            <div class="text-warning" v-if="tableTotal > max">已超出Excel的最大行数({{max | format}})</div>
          </div>
          <el-button type="primary" size="mini" @click="handleExportExcel" :disabled="!tableTotal">导出</el-button>
        </div>
        <Preview-Table
          v-if="tableData.length"
          :excelHeader="excelHeader"
          :tableData="tableData"/>
        <div v-if="!tableData.length" class="text-second">
          {{emptyMes}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="品牌提数" name="brand">
         <Title class="m-b-12" title="筛选配置"/>
        <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">
          <el-form-item label="搜索品牌">
            <el-select
              v-model="form.brandList"
              value-key="brand"
              multiple
              remote
              filterable
              :remote-method="getBrandSearch"
              :loading="loading"
              :multiple-limit="5"
              popper-class="brand-select-option-class"
              style="width: 100%"
              @change="changeBrand">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index + item"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业筛选">
            <el-cascader
              style="width: 100%"
              ref="cascader"
              popper-class="industry-cascader-wapper"
              v-model="form.cate"
              :options="categoryOption"
              :show-all-levels="false"
              :props="props">
              <template slot-scope="{ node, data }">
                <span @click="changeIndustry(data)">{{data.category}}</span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-form>
        <div class="flex-row m-t-24">
          <div style="width: 300px">
            <Title class="m-b-12" title="选择时间范围"/>
            <Group-Radio
              :activeVal="form.range"
              formKey="range"
              :options="RANGE_LEVEL"
              @handleOnGroupRadio="handleForm"/>
          </div>
          <div>
            <Title class="m-b-12" title="选择颗粒度"/>
            <Group-Radio
              :activeVal="form.particle"
              formKey="particle"
              :options="GROUP_LEVEL"
              @handleOnGroupRadio="handleForm"
              @handleOnExcelHeader="handleExcelHeader"/>
          </div>
        </div>
        <Title class="m-t-24" title="高级配置" slotText="(多选)"/>
        <Group-Checkbox
          label="品类展开："
          :codeLen="3"
          :activeVal="form.cateFlat"
          formKey="cateFlat"
          :options="CATEGORY_LEVEL"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
        <Group-Checkbox
          label="品类聚合："
          :codeLen="4"
          formKey="agg"
          :activeVal="form.agg"
          :options="CATEGORT_GROUP"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
        <Group-Checkbox
          label="数据指标："
          :codeLen="4"
          :activeVal="form.indicator"
          formKey="indicator"
          :options="DATA_INDEX"
          @handleOnGroupCheckbox="handleForm"
          @handleOnExcelHeader="handleExcelHeader"/>
        <div class="flex-between-row m-t-24">
          <div class="flex-row">
            <Title title="导出预览" backgroundColor="#5AD8A6"/>
            <div class="text-second m-l-18">当前共有{{tableTotal | format}}条数据</div>
            <div class="text-second" v-if="tableTotal > max">，</div>
            <div class="text-warning" v-if="tableTotal > max">已超出Excel的最大行数({{max | format}})</div>
          </div>
          <el-button type="primary" size="mini" @click="handleExportExcel" :disabled="!tableTotal">导出</el-button>
        </div>
        <Preview-Table
          v-if="tableData.length"
          :excelHeader="excelHeader"
          :tableData="tableData"/>
        <div v-if="!tableData.length" class="text-second">
          {{emptyMes}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import componentsMixin from '@/views/file/component.js'
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
import { previewExcel } from '@/api/download'
import { INDUSTRY_EXCEL_TABLE_PROP } from '@/utils/const.js'
import { downloadFile } from '@/utils/common.js'

export default {
  name: 'File',
  mixins: [componentsMixin],
  data () {
    return {
      activeName: 'industry',
      form: {
        cateName: '',
        cateList: [],
        brandList: null,
        range: 'one_year',
        particle: 'month',
        cateFlat: '111',
        agg: '0000',
        indicator: '0111'
      },
      loading: false,
      tableData: [],
      tableTotal: 0,
      headerObj: {
        particle: ['月'],
        cateFlat: ['一级品类', '二级品类', '三级品类'],
        agg: [],
        indicator: ['销量', 'ASP', 'GMV']
      },
      excelHeader: [],
      brandOption: [],
      categoryOption: [],
      props: {
        value: 'category',
        emitPath: false,
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      max: 1048576,
      INDUSTRY_EXCEL_TABLE_PROP,
      emptyMes: '请设置提数配置'
    }
  },
  computed: {
    ...mapState('industry', ['categoryObj'])
  },
  mounted () {
    this.form.cateName = this.categoryObj.category
    this.form.cateList = [this.categoryObj]
    this.handlePreview()
  },
  methods: {
    ...mapMutations('industry', [
      'SET_INDUSTRY_CATEGORY']),
    handleClick () {
      this.SET_INDUSTRY_CATEGORY({})
      this.tableData = []
      this.tableTotal = 0
      this.form = {
        cateName: '',
        cateList: [],
        brandList: null,
        range: 'one_year',
        particle: 'month',
        cateFlat: '111',
        agg: '0000',
        indicator: '0111'
      }
      this.handlePreview()
    },
    handleSelectTree (data) {
      // console.log('打印选择的品类', data)
      this.form.cateName = data.category
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
    async handlePreview () {
      // console.log('打印参数', this.form.cateName, '!!', this.form.brandList, '~~', (this.form.cateName === '') && (this.form.brandList === null ? 1 : (this.form.brandList.length === 0)))
      if ((this.form.cateName === '') && (this.form.brandList === null ? 1 : (this.form.brandList.length === 0))) {
        this.emptyMes = '请设置提数配置'
        return
      }
      if (this.form.agg === 'undefined' || this.form.agg === '0000') {
        this.emptyMes = '请至少选择一种品类聚合类型'
        this.tableData = []
        this.tableTotal = 0
        return
      }
      this.emptyMes = '计算中...'
      this.tableData = []
      this.tableTotal = 0
      const res = await previewExcel(this.form)
      if (res.code === 200) {
        this.tableData = res.result
        this.tableTotal = res.total
      } else {
        this.tableData = []
        this.tableTotal = 0
        this.emptyMes = 'Excel预览数据请求失败'
      }
    },
    changeBrand () {
      // this.form.cateList = []
      // this.form.cate = ''
      this.getCategoryByBrands()
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
      this.categoryOption = []
      const res = await getCategorytByBrand({ brandList: this.form.brandList })
      if (res.code === 200) {
        this.categoryOption = res.result
      } else {
        this.$message.error('品牌分类请求失败')
      }
    },
    // 导出excel
    // handleOnExcel () {
    //   console.info('点击导出', this.form)
    //   this.$emit('handleExportExcel', this.form)
    // },
    // 提数接口
    handleExportExcel () {
      const option = {
        param: this.form,
        url: process.env.VUE_APP_API_URL + '/download/file',
        filename: `Tmall_${this.form.cateName ? this.form.cateName : this.form.brandList.join('_')}_${this.$moment(new Date()).format('YYYYMMDD')}`,
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
@import './index.styl'
</style>
