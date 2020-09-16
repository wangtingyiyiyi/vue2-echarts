<template>
  <div class="brand-setting-wapper">
    配置筛选
    <el-form :model="brandForm" class="m-t-20" label-position="left" label-width="70px" ref="brandForm">
      <el-form-item label="品牌" prop="brandId">
        <el-select
          v-model="brandForm.brandList"
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
        <el-button type="primary" class="m-l-24" @click="onSubmit" :disabled="brandForm.brandList.length === 0">查询</el-button>
        <el-button @click="onClean">清除</el-button>
      </el-form-item>
      <el-form-item label="行业" prop="cid">
          <el-select
            ref="select"
            :value="categoryLabel"
            filterable
            remote
            placeholder="请输入搜索品类"
            style="width: 600px">
            <el-option value="0" class="hidden"></el-option>
              <el-tree
                ref="tree"
                :data="categoryOption"
                node-key="key"
                class="select-tree"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                :render-content="renderContent"
                :props="{children: 'childList', label: 'label'}">
              </el-tree>
          </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getBrandByLikeCondition, getCategorytByBrand } from '@/api/brand'
import mixin from '@/utils/mixin/selectTree.js'
const INITBRANDFORM = { brandList: [], cateList: [] }
export default {
  mixins: [mixin],
  data () {
    return {
      brandForm: { brandList: [], cateList: [{ outCat1: '', outCat2: '', outCat3: '' }] },
      brandOption: [],
      categoryOption: [],
      categoryLabel: '',
      loading: false
    }
  },
  methods: {
    ...mapMutations('brand', ['SET_BRAND_BRANDS', 'SET_BRAND_CATEGORY']),
    onSubmit () {
      this.SET_BRAND_BRANDS(this.brandForm.brandList)
      this.SET_BRAND_CATEGORY(this.brandForm.cateList)
      this.$emit('brandOnSubmit')
    },
    onClean () {
      this.$refs.brandForm.resetFields()
      this.brandForm = INITBRANDFORM
      this.SET_BRAND_BRANDS([])
      this.SET_BRAND_CATEGORY([])
      this.$emit('brandOnSubmit', INITBRANDFORM)
    },
    changeBrand () {
      this.getCategory()
    },
    handleNodeClick (data, node, ref) {
      this.categoryLabel = data.label
      this.brandForm.cateList[0].outCat1 = data.outCat1
      this.brandForm.cateList[0].outCat2 = data.outCat2
      this.brandForm.cateList[0].outCat3 = data.outCat3
      this.$refs.select.blur()
      console.info(data)
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
      if (this.brandForm.brandList.length === 0) {
        this.categoryOption = []
        return
      }
      const res = await getCategorytByBrand({ brandList: this.brandForm.brandList })
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

.el-select-dropdown
  .hidden
    display: none

.select-tree >>> .tree-select-icon
  display inline-block
  margin-right 10px
  font-size 12px
  width 14px
  height 14px
  line-height 14px
  text-align center
  border-radius 10px
  background-color $base-white
</style>
