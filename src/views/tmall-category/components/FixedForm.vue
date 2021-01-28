<template>
  <div class="form-wapper">
    <el-form inline label-position="left" ref="tamllCateForm">
      <el-form-item label-width="50px">
        <span slot="label" class="form-label">行业</span>
        <Cate-Select-Tree
          class="industry-select"
          :defaultObj="INDUSTRY_DEFAULT_INDUSTRY"
          @handleSelectTree="handleNodeClick"/>
      </el-form-item>
      <el-form-item>
        <div slot="label" class="swap"></div>
      </el-form-item>
    </el-form>
    <div class="flex-row">
      <Array-Obj-Select
        :options="RANGE_LEVEL"
        style="width: 100px"
        class="m-r-10"
        :value="rangeItemVal"/>
      <Button-Group
        :options="GROUP_LEVEL"
        class="m-r-10"
        :activeVal="groupItemVal"
        @handleClick="handleGroupClick">
      </Button-Group>
      <Array-Obj-Select
        :options="monthOptions"
        style="width: 100px"
        :value="monthItemValue"/>
    </div>
  </div>
</template>

<script>
import { RANGE_LEVEL, GROUP_LEVEL, INDUSTRY_DEFAULT_INDUSTRY } from '@/utils/const.js'
import { getMonthOption } from '@/api/tmall-category.js'
import CateSelectTree from '@/views/tmall-category/components/CateSelectTree.vue'

export default {
  name: 'FixedForm',
  data () {
    return {
      RANGE_LEVEL,
      GROUP_LEVEL,
      INDUSTRY_DEFAULT_INDUSTRY,
      groupItemVal: 'month',
      rangeItemVal: 'all',
      monthItemValue: '',
      monthOptions: []
    }
  },
  components: { CateSelectTree },
  methods: {
    handleSelectdMonth () {},
    handleGroupClick () {},
    handleNodeClick () {},
    async getMonthOption () {
      const res = await getMonthOption({ range: this.rangeItemVal, particle: this.groupItemVal })
      if (res.code === 200) {
        this.monthOptions = res.result.map(item => {
          return { label: item, value: item }
        })
        this.monthItemValue = res.result[0]
      } else {
        this.$message.error('行业分类月份列表请求失败')
      }
    }
  },
  mounted () {
    this.getMonthOption()
  }
}
</script>

<style lang="stylus" scoped>
.form-wapper
  background-color #ffffff
  height 64px
  padding 0 28px 0 16px
  display flex
  justify-content space-between
  align-items center
  & >>>
    .el-form-item
      margin-bottom 0px
      margin-right 0px
      .el-form-item__label
        padding-right 0px
.flex-row
  display flex
  align-items center
.swap
  width 2px
  background-color #CBD1DC
  height 26px
  margin 3px 20px 0px
</style>
