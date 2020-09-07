<template>
  <div class="industry-setting-wapper">
    配置筛选
    <el-form :model="industryForm" class="m-t-20" inline  label-position="left" label-width="70px" ref="industryForm">
      <el-form-item label="目标品类" prop="brandId">
        <TreeSelect />
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <el-button type="primary" class="m-l-24" @click="onSubmit">查询</el-button>
          <Text-Button text="高级筛选" @handleClick="handleFilter" class="p-0-15 font-size-13" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import TreeSelect from './TreeSelect'
export default {
  name: 'IndustrySetting',
  components: { TextButton, TreeSelect },
  data () {
    return {
      dialogVisible: false,
      industryForm: {
        cate: null
      }
    }
  },
  methods: {
    handleFilter () {
      this.$emit('handleFilter', true)
    },
    onSubmit () {
      this.$emit('brandOnSubmit', this.industryForm)
    }
  }
}
</script>

<style lang="stylus" scoped>
.industry-setting-wapper
  background-color #ffffff
  padding 20px 26px

.industry-tree
  width 400px
  & >>> .vue-treeselect__control
    border-radius 0px
    height 32px
</style>
