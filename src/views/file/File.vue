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
          <el-button type="primary" size="mini" :disabled="!tableTotal">导出</el-button>
        </div>
        <Preview-Table
          v-if="tableData.length"
          :excelHeader="excelHeader"
          :tableData="tableData"/>
        <div v-if="!tableData.length" class="text-second">
          {{emptyMes}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="品牌提数" name="brand">品牌提数</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import componentsMixin from '@/views/file/component.js'
import { previewExcel } from '@/api/download'
import { INDUSTRY_EXCEL_TABLE_PROP } from '@/utils/const.js'
export default {
  name: 'File',
  mixins: [componentsMixin],
  data () {
    return {
      activeName: 'industry',
      form: {
        cateName: '',
        cateList: [{ category: '全部', rank: 1 }],
        brandList: ['花西子'],
        range: 'one_year',
        particle: 'month',
        cateFlat: '111',
        agg: '0000',
        indicator: '0111'
      },
      tableData: [],
      tableTotal: 0,
      headerObj: {
        particle: ['月'],
        cateFlat: ['一级品类', '二级品类', '三级品类'],
        agg: [],
        indicator: ['销量', 'ASP', 'GMV']
      },
      excelHeader: [],
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
    handleClick () {

    },
    handleSelectTree (data) {
      this.form.cateName = data.category
      this.form.cateList = [data]
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
      if (Object.keys(this.categoryObj).length === 0) {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
