<template>
  <div class="brand-setting-wapper">
    配置筛选
    <el-form :model="brandForm" class="brand-form" label-position="left" label-width="70px" ref="brandForm">
      <el-form-item label="品牌" prop="brandId">
        <el-select v-model="brandForm.brandId" multiple style="width: 400px">
          <el-option
            v-for="item in brandOption"
            :key="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-button type="primary" class="m-l-24" @click="onSubmit">查询</el-button>
        <el-button @click="onClean">清除</el-button>
      </el-form-item>
      <el-form-item label="行业" prop="cid">
        <el-select v-model="brandForm.cid" multiple placeholder="行业筛选">
          <el-option
            v-for="item in cidOptioin"
            :key="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const brandOption = ['伊利', '蒙牛', '农夫山泉']
const cidOptioin = ['快销品', '果汁']
export default {
  data () {
    return {
      brandForm: {
        brandId: [],
        cid: []
      },
      brandOption: brandOption,
      cidOptioin: cidOptioin
    }
  },
  methods: {
    onSubmit () {
      this.$emit('brandOnSubmit', this.brandForm)
    },
    onClean () {
      this.$refs.brandForm.resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.brand-setting-wapper
  background-color #ffffff
  padding 20px 26px

.brand-form
  margin-top 20px
</style>
