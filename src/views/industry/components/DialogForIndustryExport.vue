<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="10vh"
    width="1200px">
    <div slot="title">行业提数</div>
    <div class="flex-wapper">
      <div style="width: 40%">
        <Title title="提数配置"/>
        <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">
          <el-form-item label="目标行业">
            <Industry-Select-Tree :defaultObj="categoryObj" @handleSelectTree="handleSelectTree"/>
          </el-form-item>
        </el-form>
        <Preview-Form-Regulator
          @handleExcelHeader="handleExcelHeader"/>
      </div>
      <div style="width: 5%"></div>
      <div style="width: 55%">
        <Title title="Excel预览"/>
         <Preview-Table
          :excelHeader="excelHeader"
          :tableData="tableData"
          :tableTotal="tableTotal"
          :emptyMes="emptyMes"/>
      </div>
    </div>
    <Preview-Footer-Button
      slot="footer"
      class="dialog-footer"
      :btnDisabled="tableTotal === 0"
      @hanleOnCancel="closeDialog"
      @handleOnExcel="handleOnExcel"/>
  </el-dialog>
</template>

<script>
import IndustrySelectTree from '@/views/industry/components/IndustrySelectTree.vue'
import PreviewMixin from '@/components/Preview/mixin.js'
import { mapState } from 'vuex'
export default {
  name: 'DialogForIndustryExport',
  mixins: [PreviewMixin],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  components: { IndustrySelectTree },
  data () {
    return {
      form: {
        cateName: '',
        cateList: [],
        brandList: null
      }
    }
  },
  computed: {
    ...mapState('industry', ['categoryObj'])
  },
  mounted () {
    this.form.cateName = this.categoryObj.category
    this.form.cateList = [this.categoryObj]
  },
  methods: {
    handleSelectTree (data) {
      this.form.cateName = data.category
      this.form.cateList = [data]
      this.handlePreview()
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-wapper
  display flex
  width 100%
</style>
