<template>
  <div class="industry-setting-wapper">
    <el-form class="m-t-20" inline label-position="left" label-width="70px" ref="industryForm">
      <el-form-item>
        <span slot="label" class="form-label">选择行业</span>
        <Industry-Select-Tree
          ref="IndustrySelectTree"
          class="industry-select"
          :defaultObj="$attrs.defaultObj"
          @handleSelectTree="handleNodeClick"/>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <Text-Button
            v-permission
            class="p-0-15 font-size-14 m-l-5"
            text="高级筛选"
            @handleClick="handleFilter" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import IndustrySelectTree from '@/views/industry/components/IndustrySelectTree.vue'
import { mapMutations } from 'vuex'
import permission from '@/utils/directives/permission.js' // 权限判断指令

export default {
  name: 'IndustrySetting',
  components: { TextButton, IndustrySelectTree },
  directives: { permission },
  methods: {
    ...mapMutations('industry', ['SET_INDUSTRY_CATEGORY']),
    handleFilter () {
      this.$emit('handleFilter', true)
    },
    handleNodeClick (data) {
      this.SET_INDUSTRY_CATEGORY(data)
      this.$emit('industryNodeClick', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.industry-setting-wapper
  background-color #ffffff
  padding 20px 26px
  >>> .form-label
    font-weight 500
.industry-select
  width calc(100vh / 6)
  min-width 400px
</style>
