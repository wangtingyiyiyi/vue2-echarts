<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="file-tab-wapper">
      <el-tab-pane label="行业提数" name="industry">
        {{form}}
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
              @handleOnGroupRadio="handleForm"/>
          </div>
        </div>
        <Title class="m-t-24" title="高级配置" slotText="(多选)"/>
        <Group-Checkbox
          label="品类展开："
          :codeLen="3"
          :activeVal="form.cateFlat"
          formKey="cateFlat"
          :options="CATEGORY_LEVEL"
          @handleOnGroupCheckbox="handleForm"/>
        <Group-Checkbox
          label="品类聚合："
          :codeLen="4"
          formKey="agg"
          :activeVal="form.agg"
          :options="CATEGORT_GROUP"
          @handleOnGroupCheckbox="handleForm"/>
        <Group-Checkbox
          label="数据指标："
          :codeLen="4"
          :activeVal="form.indicator"
          formKey="indicator"
          :options="DATA_INDEX"
          @handleOnGroupCheckbox="handleForm"/>
        <div class="flex-between-row m-t-24">
          <Title title="导出预览" backgroundColor="#5AD8A6"/>
          <el-button type="primary" size="mini">导出</el-button>
        </div>
        {{excelHeader}}
      </el-tab-pane>
      <el-tab-pane label="品牌提数" name="brand">品牌提数</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import componentsMixin from '@/views/file/component.js'
import PreviewMixin from '@/components/Preview/mixin.js'
import { previewExcel } from '@/api/download'

export default {
  name: 'File',
  mixins: [componentsMixin, PreviewMixin],
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
        agg: '0100',
        indicator: '0111'
      },
      tableData: [],
      tableTotal: 0,
      excelHeader: []
    }
  },
  computed: {
    ...mapState('industry', ['categoryObj'])
  },
  mounted () {
    // this.form.cateName = this.categoryObj.category
    // this.form.cateList = [this.categoryObj]
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
    },
    async handlePreview () {
      this.emptyMes = '计算中...'
      this.tableData = []
      this.tableTotal = 0
      const res = await previewExcel(Object.assign(this.form, this.regulatorForm))
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
