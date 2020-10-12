<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="10vh"
    width="1200px">
    <div slot="title">品牌提数</div>
    <div class="flex-wapper">
      <div style="width: 30%">
        <Title title="提数配置"/>
        <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">
          <el-form-item label="搜索品牌" prop="brandId">
            <el-select
              v-model="form.brandList"
              value-key="brand"
              multiple
              remote
              filterable
              collapse-tags
              :remote-method="getBrand"
              :loading="loading"
              :multiple-limit="5"
              popper-class="brand-select-option-class"
              @change="changeBrand"
              style="width: 100%">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index + item.brand"
                :value="item"
                :label="item.brand"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业筛选" prop="cid">
            <el-cascader
              style="width: 100%"
              ref="cascader"
              popper-class="industry-cascader-wapper"
              v-model="form.catetegoryId"
              :options="categoryOption"
              :show-all-levels="false"
              :props="props">
              <template slot-scope="{ node, data }">
                <span @click="changeIndustry(data)">{{getNode(node, data)}}</span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-button-group v-model="form.range">
              <el-button
                v-for="item in RANGE_LEVEL"
                :key="item.value"
                @click="handleRange(item)"
                :type="form.range === item.value ? 'primary' : ''">{{item.label}}</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item label="颗粒度">
            <el-button-group v-model="form.group">
              <el-button
                v-for="item in GROUP_LEVEL"
                :key="item.value"
                @click="handleGroup(item)"
                :type="form.group === item.value ? 'primary' : ''">{{item.label}}</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item label="品类展开">
            <el-checkbox-group v-model="cateFlat" @change="changeCateFlat">
              <el-checkbox
                v-for="item in CATEGORY_LEVEL"
                :key="item.value"
                checked
                :label="item">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="品类聚合">
            <el-checkbox-group v-model="agg" @change="changeAgg">
              <el-checkbox
                v-for="item in CATEGORT_GROUP"
                :key="item.value"
                :label="item">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="数据指标">
            <el-checkbox-group v-model="indicator" @change="changeIndicator">
              <el-checkbox
                v-for="item in DATA_INDEX"
                :key="item.value"
                :label="item">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 10%"></div>
      <div style="width: 60%">
        <Title title="Excel预览"/>
        <div v-if="tableData.length !== 0">
          <el-table
            :data="tableData"
            ref="excelTable"
            class="excel-table"
            header-row-class-name="excel-header-class"
            row-class-name="excel-row-class"
            stripe
            border>
            <el-table-column
              show-overflow-tooltip
              v-for="item in excelHeader"
              :key="item.label"
              :prop="item.prop"
              :align="item.align"
              min-width="120px"
              :label="item.label">
              <template slot-scope="{row}">
                <span  v-if="item.formatter">{{row[item.prop] | format}}</span>
                <span v-else>{{row[item.prop]}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 4px">当前共有 {{tableTotal | format}} 条数据</div>
        </div>
        <div v-else>{{emptyMes}}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit" :disabled="btnDisabled">导出</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  RANGE_LEVEL,
  GROUP_LEVEL,
  CATEGORY_LEVEL,
  CATEGORT_GROUP,
  DATA_INDEX,
  INDUSTRY_EXCEL_TABLE_PROP
} from '@/utils/const.js'
import { replenishSum, debounce } from '@/utils/common.js'
import { previewExcel } from '@/api/industry'
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
import { mapState } from 'vuex'
export default {
  name: 'DialogForIndustryExport',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('brand', ['brandList', 'categoryId', 'categoryOptions']),
    btnDisabled () {
      return this.indicator.length === 0 || this.agg.length === 0
    }
  },
  data () {
    return {
      cateFlat: [],
      agg: [],
      indicator: [],
      group: {},
      form: {
        id: '',
        range: '1',
        group: '0',
        cateFlat: '111',
        agg: '000',
        indicator: '0000',
        cateName: '',
        catetegoryId: '',
        brandList: []
      },
      RANGE_LEVEL,
      GROUP_LEVEL,
      CATEGORY_LEVEL,
      CATEGORT_GROUP,
      DATA_INDEX,
      excelHeader: [],
      tableData: [],
      tableTotal: 0,
      emptyMes: '请选择配置项',
      categoryOption: [],
      brandOption: [],
      loading: false,
      props: {
        children: 'childList',
        value: 'id',
        leaf: 'hasChild',
        emitPath: false,
        checkStrictly: true,
        expandTrigger: 'hover'
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    onCancel () {
      this.closeDialog()
    },
    getNode (node, data) {
      if (node.level === 1) {
        return data.outCat1
      } else if (node.level === 2) {
        return data.outCat2
      } else if (node.level === 3) {
        return data.outCat3
      }
    },
    changeBrand () {

    },
    // 目标行业
    handleSelectTree (data) {
      this.form.cateName = data.label
      this.form.id = data.id
      this.handlePreview()
    },
    // 时间范围
    handleRange (item) {
      this.form.range = item.value
      this.handleExcelHeader()
    },
    // 颗粒度
    handleGroup (item) {
      this.form.group = item.value
      this.group = item
      this.handleExcelHeader()
    },
    // 按照品类展开
    changeCateFlat (val) {
      this.handleSum(val, 'cateFlat', 3)
      this.handleExcelHeader()
    },
    // 按照品类聚合
    changeAgg (arr) {
      this.handleSum(arr, 'agg', 3)
    },
    // 按照数据指标
    changeIndicator (arr) {
      this.handleSum(arr, 'indicator', 4)
    },
    // 导出Excel
    async onSubmit () {
      this.$message.info('该功能正在开发中，敬请期待')
      // this.closeDialog()
      // this.$emit('handleExportExcel', this.form)
    },
    // 求和补位
    handleSum (arrObj, key, len) {
      const val = arrObj.map(item => item.industryWeights)
      this.form[key] = replenishSum(val, len)
      this.handleExcelHeader()
    },
    // 设置Excel表头
    handleExcelHeader () {
      const group = this.group.industryExcelHeader || []
      const cateFlats = this.cateFlat.map(item => item.industryExcelHeader)
      const aggs = this.agg.map(item => item.industryExcelHeader)
      const indicators = this.indicator.map(item => item.industryExcelHeader)
      const selectHeader = [...cateFlats, ...aggs, ...indicators, ...group].flat() // 降维
      this.excelHeader = INDUSTRY_EXCEL_TABLE_PROP.filter(item => {
        return selectHeader.indexOf(item.label) !== -1
      })
      this.handlePreview()
    },
    // 在线预览
    async handlePreview () {
      if (!this.form.id) { return }
      if (this.form.agg === '000') {
        this.emptyMes = '请至少选择一种品类聚合类型'
        return
      }
      if (this.form.indicator === '0000') {
        this.emptyMes = '请至少选择一种数据指标'
        return
      }
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
    getBrand (query) {
      debounce(async () => {
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
      })
    },
    // 品牌分类
    async getCategory () {
      const res = await getCategorytByBrand({ brandList: this.form.brandList })
      if (res.code === 200) {
        this.categoryOption = res.result
      } else {
        this.$message.error('品牌分类请求失败')
      }
    },
    setBrandData () {
      this.brandOption = this.brandList
      this.form.brandList = this.brandList
      this.form.catetegoryId = this.categoryId
      this.categoryOption = this.categoryOptions
    }
  },
  mounted () {
    this.setBrandData()
  }
}
</script>

<style lang="stylus" scoped>
.flex-wapper
  display flex
  width 100%

.excel-table
  width 100%

.excel-table >>> .excel-header-class th
  padding 0
  font-weight bolder
  font-size 14px
  color #111111

.excel-table >>> .excel-row-class td
  padding 0
  font-size 12px
  color #111111

.excel-table >>> .el-table__body-wrapper
  &::-webkit-scrollbar{
    width: 6px;
  }
  &::-webkit-scrollbar:horizontal{
    height: 8px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 6px;
    background-color: #ccc;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-corner{
    display: none;
  }
</style>
