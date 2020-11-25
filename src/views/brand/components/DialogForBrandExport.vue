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
      <div style="width: 40%">
        <Title title="提数配置"/>
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
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
import { mapState } from 'vuex'
import PreviewMixin from '@/components/Preview/mixin.js'
export default {
  name: 'DialogForIndustryExport',
  mixins: [PreviewMixin],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('brand', ['brandList', 'cate'])
  },
  data () {
    return {
      form: {
        cate: '',
        cateList: [],
        brandList: []
      },
      categoryOption: [],
      brandOption: [],
      loading: false,
      props: {
        value: 'category',
        emitPath: false,
        checkStrictly: true,
        expandTrigger: 'hover'
      }
    }
  },
  mounted () {
    this.form.brandList = this.brandList
    this.getCategoryByBrands().then(() => {
      this.form.cate = this.cate.category
      this.form.cateList = [this.cate]
    })
  },
  methods: {
    changeBrand () {
      // this.form.cateList = []
      // this.form.cate = ''
      this.getCategoryByBrands()
    },
    changeIndustry (data) {
      this.form.cate = data.category
      this.form.cateList = [Object.assign(this._.cloneDeep(data), { children: null })]
      this.handlePreview()
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-wapper
  display flex
  width 100%
</style>
