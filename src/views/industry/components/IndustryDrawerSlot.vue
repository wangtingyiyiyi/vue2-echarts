<template>
  <div class="drawer-wapper">
    <div class="drawer-header">高级筛选</div>
    <Text-Button text="自定义品类" style="padding: 20px 20px 10px" @handleClick="handleDialog">
      <Svg-Icon icon-class="upload" class="m-r-7" style="font-size: 28px" slot="prepend"/>
    </Text-Button>
    <Title title="历史自定义标签" style="margin-left: 20px"/>
    <div class="drawer-body beauty-scroll">
      <div v-for="(item, index) in tagList" :key="index">
        <div class="item-title">
          <div class="left">
            <Text-Button
              :text="item.category"
              :iconClass="setIcon(index)"
              iconPosition="after"
              @handleClick="handleClick(index)"
              class="font-size-14"/>
          </div>
          <div class="right">
            <div>{{item.updateTime | moment('YYYY-MM-DD HH:mm')}}</div>
            <i class="el-icon-close m-l-3"></i>
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
    <div class="drawer-footer">
      <el-button>确定</el-button>
      <el-button type="primary">取消</el-button>
    </div>
    <Dialog-For-Industry-Select
      :dialogVisible="dialogVisible"
      v-if="dialogVisible"
      @closeDialog="dialogVisible = $event"/>
  </div>
</template>

<script>
import { getIndustryDefineList } from '@/api/industry.js'
import TextButton from '@/components/TextButton.vue'
import DialogForIndustrySelect from '@/views/industry/components/DialogForIndustrySelect.vue'
export default {
  name: 'IndustryDrawerSlot',
  components: { TextButton, DialogForIndustrySelect },
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
      dialogVisible: false
    }
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
    // 自定义品类方法
    handleDialog () {
      this.dialogVisible = true
    },
    // 点击展开或者收起
    handleClick (index) {
      const p = this.isCollapseGroup.indexOf(index)
      p === -1 ? this.isCollapseGroup.push(index) : this.isCollapseGroup.splice(p, 1)
    },
    // 判断显示图标
    setIcon (index) {
      let icon = ''
      this.isCollapseGroup.includes(index) ? icon = 'el-icon-arrow-up' : icon = 'el-icon-arrow-down'
      return icon
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
    .item-title
      border-bottom 1px solid $color-border
      display flex
      justify-content space-between
      align-items center
      padding-bottom 5px
      margin-bottom 5px
      .left
        display flex
        align-items center
        font-size 14px
      .right
        color $color-light-gary
        font-size 12px
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

  .slide-fade-enter-active, .slide-fade-leave-active
    transition: opacity .3s ease

  .slide-fade-enter, .slide-fade-leave-to
    opacity: 0

</style>
