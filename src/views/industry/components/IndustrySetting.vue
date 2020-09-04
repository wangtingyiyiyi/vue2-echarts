<template>
  <div class="industry-setting-wapper">
    配置筛选
    <el-form :model="industryForm" class="m-t-20" inline  label-position="left" label-width="70px" ref="industryForm">
      <el-form-item label="目标品类" prop="brandId">
        <treeselect
          v-model="industryForm.cate"
          placeholder="选择品类"
          :options="options"
          :load-options="loadOptions"
          class="industry-tree"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="m-l-24" @click="onSubmit">查询</el-button>
        <Text-Button text="高级筛选" @handleClick="handleFilter" class="p-0-15 font-size-13" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import TextButton from '@/components/TextButton.vue'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'IndustrySetting',
  components: { Treeselect, TextButton },
  data () {
    return {
      dialogVisible: false,
      industryForm: {
        cate: null
      },
      // 有子节点，则返回children字段
      options: [{
        id: 'a',
        label: 'a',
        children: null
      }, {
        id: 'b',
        label: 'b',
        children: null
      }, {
        id: 'c',
        label: 'c'
      }]
    }
  },
  methods: {
    handleFilter () {
      this.$emit('handleFilter', true)
    },
    onSubmit () {
      this.$emit('brandOnSubmit', this.industryForm)
    },
    loadOptions ({ action, parentNode, callback }) {
      setTimeout(() => {
        parentNode.children = [{
          id: 'child' + parentNode.id,
          label: 'child option'
        }]
        callback()
      }, 2000)
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
