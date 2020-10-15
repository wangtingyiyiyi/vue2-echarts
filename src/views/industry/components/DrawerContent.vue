<template>
  <div class="drawer-wapper">
    <div class="drawer-header">高级筛选</div>
    <Text-Button text="自定义品类" style="padding: 20px 20px 10px" @handleClick="handleDialog">
      <Svg-Icon icon-class="upload" class="m-r-7" style="font-size: 28px" slot="prepend"/>
    </Text-Button>
    <Title title="历史自定义标签" style="margin-left: 20px; margin-top: 20px"/>
    <div class="drawer-body beauty-scroll">
      <div v-for="(item, index) in tagList" :key="index" class="border-dotted-bottom">
        <div class="item-title" @click="showMore(index)">
          <div class="left">
            <span @click.stop="handleEdit(item)" style="cursor: pointer;"><Svg-Icon icon-class="left" class="m-r-7" /></span>
            <Text-Button
              :text="item.category"
              @handleClick="handleSearch(item)"
              class="font-size-14">
            </Text-Button>
            <i :class="[setIcon(index), 'gary-text']" style="cursor: pointer; margin-left: 5px" slot="append"></i>
          </div>
          <div class="right gary-text">
            <div class="m-r-7">{{item.updateTime | moment('YYYY-MM-DD HH:mm')}}</div>
            <i class="el-icon-close m-l-3" style="cursor: pointer" @click.stop="handleRemove(item, index)"></i>
          </div>
        </div>
        <transition-group name="slide-fade">
          <template v-if="setIcon(index) === 'el-icon-arrow-up'">
            <div class="item-info m-b-5" v-for="(i, idx) in item.categoryList" :key="idx">
              <div class="point"></div>
              <div class="text-overflow">{{i}}</div>
            </div>
          </template>
        </transition-group>
      </div>
    </div>
    <!-- 行业定义 -->
    <Dialog-For-Industry-Define
      :dialogVisible="defineDialogVisible"
      :cateId="cateId"
      :editDefineName="editDefineName"
      v-if="defineDialogVisible"
      @onSubmit="onSubmit"
      @closeDialog="defineDialogVisible = $event"/>

     <!-- 自定义行业删除 -->
    <Dialog-For-Industry-Remove
      :dialogVisible="removeDialogVisible"
      :removeObj="removeObj"
      v-if="removeDialogVisible"
      @onSubmit="onRemove"
      @closeDialog="removeDialogVisible = $event"/>
  </div>
</template>

<script>
import { getIndustryDefineList, setDefineIndustry, delDefineIndustry } from '@/api/industry.js'
import TextButton from '@/components/TextButton.vue'
import DialogForIndustryDefine from '@/views/industry/components/DialogForIndustryDefine.vue'
import DialogForIndustryRemove from '@/views/industry/components/DialogForIndustryRemove.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'DrawerContent',
  components: { TextButton, DialogForIndustryDefine, DialogForIndustryRemove },
  props: {
    drawerShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tagList: [],
      isCollapseGroup: [],
      defineDialogVisible: false,
      removeDialogVisible: false,
      cateId: [],
      categoryId: '',
      editDefineName: '',
      removeObj: {},
      removeIndex: 0
    }
  },
  computed: {
    ...mapState('industry', ['categoryObj'])
  },
  watch: {
    drawerShow: {
      handler: function (drawerShow) {
        if (drawerShow) {
          this.getDefineList()
        }
      }
    }
  },
  methods: {
    ...mapMutations('industry', ['SET_INDUSTRY_CATEGORY']),
    // 自定义品类方法
    handleDialog () {
      this.cateId = []
      this.defineDialogVisible = true
    },
    handleSearch (data) {
      // event.stopPropagation()
      const param = {
        label: data.category,
        id: data.categoryId,
        remark: 'define'
      }
      this.SET_INDUSTRY_CATEGORY(param)
      this.$emit('handleSearch', param)
    },
    // 点击展开或者收起
    showMore (index) {
      const p = this.isCollapseGroup.indexOf(index)
      p === -1 ? this.isCollapseGroup.push(index) : this.isCollapseGroup.splice(p, 1)
    },
    // 判断显示图标
    setIcon (index) {
      let icon = ''
      this.isCollapseGroup.includes(index) ? icon = 'el-icon-arrow-up' : icon = 'el-icon-arrow-down'
      return icon
    },
    // 设置高度
    setClass (index) {
      if (this.setIcon(index) === 'el-icon-arrow-up') {
        return ''
      } else {
        return 'm-b-5'
      }
    },
    // 自定义行业删除回调
    async onRemove (categoryId) {
      const res = await delDefineIndustry({ categoryIdList: categoryId })
      if (res.code === 200) {
        this.$message.success('删除成功')
        this.removeDialogVisible = false
        this.$parent.$refs.mask.style.backgroundColor = 'rgba(0,0,0,0.3)'
        this.tagList.splice(this.removeIndex, 1)
      } else {
        this.$message.error('删除失败,请稍后再试')
      }
    },
    // 删除自定义品类
    handleRemove (data, index) {
      this.removeObj = data
      this.removeIndex = index
      this.removeDialogVisible = true
    },
    // dialog 保存回调
    async onSubmit (param) {
      this.defineDialogVisible = false
      // 编辑
      if (this.categoryId !== '') {
        param.categoryId = this.categoryId
      }
      const res = await setDefineIndustry(param)
      if (res.code === 200) {
        this.$message.success('保存成功')
        this.getDefineList()
      } else {
        this.$message.error('自定义行业失败')
      }
    },
    // dialog 编辑
    handleEdit (data) {
      console.info(data)
      this.cateId = data.categoryIdList
      this.categoryId = data.categoryId
      this.editDefineName = data.category
      this.defineDialogVisible = true
    },
    // 请求列表API
    async getDefineList () {
      const res = await getIndustryDefineList()
      if (res.code === 200) {
        this.tagList = res.result
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .drawer-wapper
    position relative
    z-index 1
    overflow auto
    background-color #fff
    background-clip padding-box
    border 0
    height 80vh
    margin-top 10vh
    overflow hidden

  .drawer-header
    border-bottom 2px solid $color-border
    padding 20px 20px 10px

  .drawer-body
    height calc(100% - 197px)
    padding 0 20px
    .border-dotted-bottom
      border-bottom 1px dotted $color-border
    .item-title
      display flex
      justify-content space-between
      align-items center
      min-height 50px
      cursor pointer
      .left
        display flex
        align-items center
        font-size 14px
        width 200px
        font-weight 500
      .right
        display flex
        align-items center
    .item-info
      padding-left 10px
      color $color-cate-gary
      font-size 14px
      display flex
      align-items center
      .point
        width 4px
        height 4px
        border-radius 4px
        margin-right 10px
        background-color #0E1741

  .drawer-footer
    position absolute
    bottom 0
    width 100%
    text-align center
    height 42px

  .gary-text
    color $color-light-gary
    font-size 12px

  .slide-fade-enter-active, .slide-fade-leave-active
    transition: opacity .3s ease

  .slide-fade-enter, .slide-fade-leave-to
    opacity: 0

</style>
