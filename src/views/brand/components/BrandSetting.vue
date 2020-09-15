<template>
  <div class="brand-setting-wapper">
    配置筛选
    <el-form :model="brandForm" class="m-t-20" label-position="left" label-width="70px" ref="brandForm">
      <el-form-item label="品牌" prop="brandId">
        <el-select
          v-model="brandForm.brand"
          value-key="brand"
          multiple
          remote
          filterable
          :remote-method="getBrand"
          :loading="loading"
          :multiple-limit="5"
          @change="changeBrand"
          style="width: 400px">
          <el-option
            v-for="(item, index) in brandOption"
            :key="index + item.brand"
            :value="item"
            :label="item.brand"
          ></el-option>
        </el-select>
        <el-button type="primary" class="m-l-24" @click="onSubmit" :disabled="brandForm.brand.length === 0">查询</el-button>
        <el-button @click="onClean">清除</el-button>
      </el-form-item>
      <el-form-item label="行业" prop="cid">
        <el-select v-model="brandForm.cate" value-key="cid" multiple placeholder="行业筛选">
          <el-option
            v-for="item in categoryOption"
            :key="item.cid"
            :value="item"
            :label="item.cat"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
const INITBRANDFORM = { brand: [], cid: [] }
export default {
  data () {
    return {
      brandForm: { brand: [], cid: [] },
      brandOption: [],
      categoryOption: [],
      loading: false
    }
  },
  methods: {
    ...mapMutations('brand', ['SET_BRAND_BRANDS', 'SET_BRAND_CATEGORY']),
    onSubmit () {
      const param = {
        brandId: this.brandForm.brand.map(item => item.brandId),
        cid: this.brandForm.cate.map(item => item.cid)
      }
      this.SET_BRAND_BRANDS(this.brandForm.brand)
      this.SET_BRAND_CATEGORY(this.brandForm.cate)
      this.$emit('brandOnSubmit', param)
    },
    onClean () {
      this.$refs.brandForm.resetFields()
      this.brandForm = { brand: [], cid: [] }
      this.SET_BRAND_BRANDS([])
      this.SET_BRAND_CATEGORY([])
      this.$emit('brandOnSubmit', INITBRANDFORM)
    },
    changeBrand () {
      this.getCategory()
    },
    // 品牌列表模糊查询
    async getBrand (query) {
      if (query) {
        this.loading = true
        const res = await getBrandByLikeCondition({ likeCondition: query })
        this.loading = false
        if (res.code === 200) {
          this.brandOption = res.result
        } else {
          this.$message.error('品牌列表搜索失败')
        }
      } else {
        this.brandOption = []
      }
    },
    // 品牌分类
    async getCategory () {
      if (this.brandForm.brand.length === 0) {
        this.categoryOption = []
      }
      const res = await getCategorytByBrand({ brandList: this.brandForm.brand })
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
.brand-setting-wapper
  background-color #ffffff
  padding 20px 26px
</style>
