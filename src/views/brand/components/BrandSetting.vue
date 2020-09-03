<template>
  <div class="brand-setting-wapper">
    配置筛选
    <el-form :model="brandForm" class="m-t-20" label-position="left" label-width="70px" ref="brandForm">
      <el-form-item label="品牌" prop="brandId">
        <el-select v-model="brandForm.brand" value-key="brandId" multiple style="width: 400px">
          <el-option
            v-for="item in brandOption"
            :key="item.brandId"
            :value="item"
            :label="item.brand"
          ></el-option>
        </el-select>
        <el-button type="primary" class="m-l-24" @click="onSubmit">查询</el-button>
        <el-button @click="onClean">清除</el-button>
      </el-form-item>
      <el-form-item label="行业" prop="cid">
        <el-select v-model="brandForm.cate" value-key="cid" multiple placeholder="行业筛选">
          <el-option
            v-for="item in cidOptioin"
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
import { mapActions } from 'vuex'
import { mockBrandsOptions, mockCidOptions } from '@/mock'
const initBrandForm = { brandId: [], cid: [] }
export default {
  data () {
    return {
      brandForm: { brandId: [], cid: [] },
      initBrandForm: initBrandForm,
      brandOption: mockBrandsOptions,
      cidOptioin: mockCidOptions
    }
  },
  methods: {
    ...mapActions('brand', ['changeSettingBrand', 'changeSettingCate']),
    onSubmit () {
      const param = {
        brandId: this.brandForm.brand.map(item => item.brandId),
        cid: this.brandForm.cate.map(item => item.cid)
      }
      this.changeSettingBrand(this.brandForm.brand)
      this.changeSettingCate(this.brandForm.cate)
      this.$emit('brandOnSubmit', param)
    },
    onClean () {
      this.$refs.brandForm.resetFields()
      this.brandForm = { brandId: [], cid: [] }
      this.changeSettingBrand([])
      this.changeSettingCate([])
      this.$emit('brandOnSubmit', this.initBrandForm)
    }
  }
}
</script>

<style lang="stylus" scoped>
.brand-setting-wapper
  background-color #ffffff
  padding 20px 26px
</style>
