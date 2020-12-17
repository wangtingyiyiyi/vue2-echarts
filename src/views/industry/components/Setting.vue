<template>
  <div class="industry-setting-wapper">
    <el-form :class="['m-t-20', scrollTop > max ? 'search-fix' : '']" inline label-position="left" label-width="70px" ref="industryForm">
      <el-form-item>
        <span slot="label" class="form-label">选择行业</span>
        <Industry-Select-Tree
          ref="IndustrySelectTree"
          class="industry-select"
          :defaultObj="$attrs.defaultObj"
          @handleSelectTree="handleNodeClick"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import IndustrySelectTree from '@/views/industry/components/IndustrySelectTree.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'IndustrySetting',
  components: { IndustrySelectTree },
  computed: {
    ...mapState('sys', ['scrollTop']),
    max () {
      return this.$route.meta.scrollTop
    }
  },
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
.search-fix
  position fixed
  top -10px
  z-index 3
  animation fadeIn .5s
</style>
