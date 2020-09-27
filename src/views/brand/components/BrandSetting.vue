<template>
  <div class="brand-setting-wapper">
    <el-form :model="brandForm" class="m-t-20" label-position="left" label-width="70px" ref="brandForm">
      <el-form-item label="搜索品牌" prop="brandId">
        <el-select
          v-model="brandForm.brandList"
          value-key="brand"
          multiple
          remote
          filterable
          :remote-method="getBrand"
          :loading="loading"
          :multiple-limit="5"
          popper-class="brand-select-option-class"
          @change="changeBrand"
          style="width: 600px">
          <el-option
            v-for="(item, index) in brandOption"
            :key="index + item.brand"
            :value="item"
            :label="item.brand"
          ></el-option>
        </el-select>
        <!-- <el-button type="primary" class="m-l-24" @click="onSubmit">查询</el-button> -->
        <!-- <el-button @click="onClean">清除</el-button> -->
      </el-form-item>
      <el-form-item label="行业筛选" prop="cid">
        <el-cascader
          style="width: 600px"
          ref="cascader"
          popper-class="industry-cascader-wapper"
          v-model="brandForm.catetegoryId"
          :options="categoryOption"
          :show-all-levels="false"
          :props="props">
          <template slot-scope="{ node, data }">
            <span @click="changeIndustry(data)">{{getNode(node, data)}}</span>
          </template>
        </el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
import mixin from '@/utils/mixin/selectTree.js'
import { debounce } from '@/utils/common.js'
// const INITBRANDFORM = { brandList: [], catetegoryId: '' }
export default {
  mixins: [mixin],
  data () {
    return {
      brandForm: { brandList: [], catetegoryId: '0' },
      brandOption: [],
      categoryOption: [{ childList: null, hasChild: false, id: '0', label: '全部', outCat1: '全部', remark: 1 }],
      categoryLabel: '',
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
  computed: {
    ...mapState('brand', ['settingParam'])
  },
  watch: {
    settingParam: {
      deep: true,
      handler: function (params) {
        this.SET_BRAND_BRANDS(params.brandList)
        this.SET_BRAND_CATEGORY(params.id)
        this.brandForm.brandList = params.brandList
        this.brandOption = params.brandList
        this.brandForm.catetegoryId = params.id
        this.$emit('brandOnSubmit')
        this.getCategory()
      }
    }
  },
  methods: {
    ...mapMutations('brand', ['SET_BRAND_BRANDS', 'SET_BRAND_CATEGORY']),
    onSubmit () {
      this.SET_BRAND_BRANDS(this.brandForm.brandList)
      this.SET_BRAND_CATEGORY(this.brandForm.catetegoryId)
      this.$emit('brandOnSubmit')
    },
    // onClean () {
    //   this.$refs.brandForm.resetFields()
    //   this.brandForm = INITBRANDFORM
    //   this.SET_BRAND_BRANDS([])
    //   this.SET_BRAND_CATEGORY('')
    //   this.$emit('brandOnSubmit', INITBRANDFORM)
    // },
    changeBrand () {
      this.getCategory()
      this.onSubmit()
    },
    // 品牌列表模糊查询
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
          }
        } else {
          this.brandOption = []
        }
      })
    },
    // 品牌分类
    async getCategory () {
      const res = await getCategorytByBrand({ brandList: this.brandForm.brandList })
      if (res.code === 200) {
        this.categoryOption = res.result
      } else {
        this.$message.error('品牌分类请求失败')
      }
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
    changeIndustry (data) {
      this.brandForm.catetegoryId = data.id
      console.info(this.$refs.cascader)
      this.onSubmit()
    }
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
