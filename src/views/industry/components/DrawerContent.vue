<template>
  <div class="drawer-wapper">
    <div class="drawer-header">高级筛选</div>
    <Text-Button text="自定义品类" style="padding: 20px 20px 10px" @handleClick="handleDialog">
      <Svg-Icon icon-class="upload" class="m-r-7 font-size-28" slot="prepend"/>
    </Text-Button>
    <Title title="历史自定义标签" class="m-l-20 m-t-20"/>
    <div class="drawer-body beauty-scroll" ref="drawerBody">
      <div v-for="(item, index) in tagList" :key="index" class="border-dotted-bottom">
        <div class="item-title" @click="showMore(index)">
          <div class="left">
            <span @click.stop="handleEdit(item)">
              <Svg-Icon icon-class="left" class="m-r-7" style="color: #5b8ff9" />
            </span>
            <Text-Button
              :text="item.title"
              maxWidth="270px"
              @handleClick="handleSearch(item)"
              class="font-size-14">
            </Text-Button>
            <i :class="[setIcon(index), 'gary-text', 'm-l-5']" slot="append"></i>
          </div>
          <div class="right gary-text">
            <div class="m-r-7">{{item.updateTime | moment('YYYY-MM-DD HH:mm')}}</div>
            <i class="el-icon-close m-l-3" @click.stop="handleRemove(item, index)"></i>
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
      :defineId="defineId"
      :defineName="defineName"
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
import { getIndustryDefineList, setIndustryDefineList, removeIndustryDefineList } from '@/api/define.js'
import TextButton from '@/components/TextButton.vue'
import DialogForIndustryDefine from '@/views/industry/components/DialogForIndustryDefine.vue'
import DialogForIndustryRemove from '@/views/industry/components/DialogForIndustryRemove.vue'
import { mapMutations, mapState } from 'vuex'
import { refLoading } from '@/utils/element.js'

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
      defineId: '',
      defineName: '',
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
      this.defineId = ''
      this.defineName = ''
      this.defineDialogVisible = true
    },
    handleSearch (data) {
      const param = {
        label: data.title,
        id: data.id,
        rank: 0
      }
      this.$emit('handleDefineSearch', param)
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
    async onRemove () {
      const res = await removeIndustryDefineList({ id: this.removeObj.id })
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
      const res = await setIndustryDefineList(param)
      if (res.code === 200) {
        this.$message.success('保存成功')
        this.getDefineList()
      } else {
        this.$message.error('自定义行业失败')
      }
    },
    // dialog 编辑
    handleEdit (data) {
      this.defineId = data.id
      this.defineName = data.title
      this.defineDialogVisible = true
    },
    // 请求列表API
    async getDefineList () {
      const loadingInstance = refLoading(this.$refs.drawerBody)
      const res = await getIndustryDefineList()
      loadingInstance.close()
      if (res.code === 200) {
        this.tagList = res.result
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-dialog .el-dialog__header
    border-bottom 1px solid #ddd

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
    border-bottom 1px solid $color-border
    padding 20px 20px 10px

  .drawer-body
    height calc(100% - 197px)
    padding 0 12px 0 20px
    .border-dotted-bottom
      border-bottom 1px dotted $color-border
    .item-title
      display flex
      justify-content space-between
      align-items center
      min-height 50px
      cursor pointer
      position sticky
      top 0
      background-color #fff
      cursor pointer
      .left
        display flex
        align-items center
        font-size 14px
        max-width 310px
        font-weight 500
      .right
        display flex
        align-items center
    .item-info
      padding-left 10px
      color $color-light-gary
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
