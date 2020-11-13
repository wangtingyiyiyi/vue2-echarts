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
        <Text-Button text="品牌提数" v-permission  @handleClick="handleExportDialog" style="display: initial;" class="p-0-15 font-size-14" />
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
import TextButton from '@/components/TextButton.vue'
import permission from '@/utils/directives/permission.js' // 权限判断指令

const DEFAULTCATEGORY = [{ childList: null, hasChild: false, id: '0', label: '全部', outCat1: '全部', remark: 1 }]

export default {
  mixins: [mixin],
  components: { TextButton },
  directives: { permission },
  data () {
    return {
      brandForm: { brandList: [], catetegoryId: '0' },
      brandOption: [],
      categoryOption: DEFAULTCATEGORY,
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
    ...mapState('brand', ['settingParam']),
    ...mapState('user', ['type'])
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
    ...mapMutations('brand', ['SET_BRAND_BRANDS', 'SET_BRAND_CATEGORY', 'SET_BRAND_CATEGORY_OPTION']),
    onSubmit () {
      console.log('上传的数据', this.brandForm.catetegoryId)
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
            this.brandOption = []
          }
        } else {
          this.brandOption = []
        }
      })
    },
    // 品牌分类
    async getCategory () {
      if (this.brandForm.brandList.length === 0) {
        this.categoryOption = DEFAULTCATEGORY
        return
      }
      const res = await getCategorytByBrand({ brandList: this.brandForm.brandList })
      if (res.code === 200) {
        this.categoryOption = this.getRecursionData(res.result)
        this.SET_BRAND_CATEGORY_OPTION(this.categoryOption)
      } else {
        this.$message.error('品牌分类请求失败')
      }
    },
    // 递归方法
    getRecursionData (data) {
      // 循环遍历json数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].childList.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].childList = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getRecursionData(data[i].childList)
        }
      }
      return data
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
      this.onSubmit()
    },
    handleExportDialog () {
      this.$emit('handleExportDialog')
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
