<template>
  <div class="drawer-wapper">
    <div class="drawer-header">高级筛选</div>
    <div class="drawer-body">
      <Text-Button text="自定义品类"/>
      <Title title="历史自定义标签"/>
      <div v-for="item in tagList" :key="item.id">
        <div class="item-title">
          <div class="left">
            <Text-Button :text="item.name" class="font-size-14"/>
            <i class="el-icon-arrow-down font-size-12"></i>
          </div>
          <div class="right">
            <div>{{item.time | moment}}</div>
            <i class="el-icon-close m-l-3"></i>
          </div>
        </div>
        <div class="item-info" v-for="i in item.children" :key="i.id">
          {{i.cat1}} > {{i.cat2}} > {{i.cat3}}
        </div>
      </div>
    </div>
    <div class="drawer-footer">
      <el-button>确定</el-button>
      <el-button type="primary">取消</el-button>
    </div>
  </div>
</template>

<script>
import TextButton from '@/components/TextButton.vue'
import { mockTagBySelf } from '@/mock.js'
export default {
  name: 'IndustryDrawerSlot',
  components: { TextButton },
  data () {
    return {
      tagList: mockTagBySelf
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

  .drawer-header
    border-bottom 2px solid $color-border
    padding 20px 20px 10px

  .drawer-body
    padding 30px
    .item-title
      border-bottom 1px solid $color-border
      display flex
      justify-content space-between
      align-items center
      padding 15px 0 8px
      .left
        display flex
        align-items center
        font-size 14px
      .right
        color $color-second
        font-size 12px
        display flex
        align-items center
    .item-info
      padding-left 10px
      color $color-second
      font-size 14px

  .drawer-footer
    position absolute
    bottom 10px
    width 100%
    text-align center
</style>
