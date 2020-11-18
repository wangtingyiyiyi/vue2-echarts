<template>
  <div class="brand-setting-wapper">
    <el-form
      ref="brandForm"
      class="m-t-20"
      label-position="left"
      label-width="70px"
      :model="brandForm" >
      <el-form-item label="搜索品牌">
        <el-select
          v-model="brandForm.brandList"
          value-key="brand"
          style="width: 600px"
          popper-class="brand-select-option-class"
          multiple
          remote
          filterable
          :remote-method="getBrandSearch"
          :loading="loading"
          :multiple-limit="5"
          @change="changeBrand">
          <el-option
            v-for="(item, index) in brandOption"
            :key="index + item"
            :value="item"
            :label="item"
          ></el-option>
        </el-select>
        <Text-Button
          v-permission
          text="品牌提数"
          style="display: initial;"
          class="p-0-15 font-size-14"
          @handleClick="handleExportDialog" />
      </el-form-item>
      <el-form-item label="行业筛选">
        <el-cascader
          v-model="brandForm.cate"
          ref="cascader"
          popper-class="industry-cascader-wapper"
          style="width: 600px"
          :options="categoryOption"
          :show-all-levels="false"
          :props="props"
          @change="changeIndustry">
          <template slot-scope="{ node, data }">
            <span @click="changeIndustry(data)">{{data.category}}</span>
          </template>
        </el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
// import mixin from '@/utils/mixin/selectTree.js'
import { debounce } from '@/utils/common.js'
import TextButton from '@/components/TextButton.vue'
import { DEFINE_BRAND } from '@/utils/const.js'
import permission from '@/utils/directives/permission.js' // 权限判断指令
import { mapMutations } from 'vuex'

export default {
  // mixins: [mixin],
  components: { TextButton },
  directives: { permission },
  data () {
    return {
      brandForm: {
        brandList: DEFINE_BRAND.brandList,
        cate: ''
      },
      brandOption: [],
      categoryOption: [],
      categoryLabel: '',
      loading: false,
      props: {
        value: 'category',
        emitPath: false,
        checkStrictly: true,
        expandTrigger: 'hover'
      }
    }
  },
  methods: {
    ...mapMutations('brand', ['SET_BRAND_CATEGORY', 'SET_BRAND_BRANDS']),
    changeBrand () {
      this.$emit('handleSetBrands', this.brandForm.brandList)
      this.SET_BRAND_BRANDS(this.brandForm.brandList)
      this.getCategoryByBrands()
    },
    changeIndustry (data) {
      this.brandForm.cate = data.category
      const obj = Object.assign(data, { children: null })
      this.SET_BRAND_CATEGORY(obj)
      this.$emit('handleSetCategroy', obj)
    },
    handleExportDialog () {
      this.$emit('handleExportDialog')
    },
    // 品牌列表模糊查询
    getBrandSearch (query) {
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
    // 根据品牌查询行业分类
    async getCategoryByBrands () {
      const res = await getCategorytByBrand({ brandList: this.brandForm.brandList })
      if (res.code === 200) {
        this.categoryOption = res.result
      } else {
        this.$message.error('品牌分类请求失败')
      }
    }
  },
  mounted () {
    this.getCategoryByBrands().then(() => {
      this.brandForm.cate = this.categoryOption[0].category
      this.SET_BRAND_BRANDS(this.brandForm.brandList)
      this.SET_BRAND_CATEGORY(Object.assign(this.categoryOption[0], { children: null }))
    })
  }
}
</script>

<style lang="stylus">
.brand-setting-wapper
  background-color #ffffff
  padding 20px 26px

.brand-select-option-class
  .el-select-dropdown__item
    max-width 600px

// 去掉radio
.industry-cascader-wapper
  .el-cascader-panel
    .el-cascader-menu__list
      .el-radio
        display none
</style>
