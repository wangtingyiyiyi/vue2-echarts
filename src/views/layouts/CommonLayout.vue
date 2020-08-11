<template>
  <el-container>
    <el-header class="layout-header">
      <div class="flex-row">
        <Header-Icon :collapsed="collapsed"/>
        <!-- <Header-Trigger @collapsChange="collapsChange"/> -->
      </div>
      <div class="flex-row">
        <Header-Notice class="m-0-12"/>
        <Header-Avatar class="m-0-12"/>
        <Header-Setting class="m-0-12"/>
      </div>
    </el-header>
    <el-container class="layout-container">
      <Layout-Sider :collapsed="collapsed"/>
      <Layout-Content class="layout-content"/>
    </el-container>
  </el-container>
</template>

<script>
import HeaderIcon from '@/views/layouts/header/HeaderIcon.vue'
// import HeaderTrigger from '@/views/layouts/header/HeaderTrigger.vue'
import HeaderAvatar from '@/views/layouts/header/HeaderAvatar.vue'
import HeaderNotice from '@/views/layouts/header/HeaderNotice.vue'
import HeaderSetting from '@/views/layouts/header/HeaderSetting.vue'
import LayoutSider from '@/views/layouts/LayoutSider.vue'
import LayoutContent from '@/views/layouts/LayoutContent.vue'

export default {
  data () {
    return {
      collapsed: false
    }
  },
  components: {
    HeaderIcon, HeaderSetting, LayoutSider, LayoutContent, HeaderNotice, HeaderAvatar
  },
  methods: {
    collapsChange (collapsed) {
      this.collapsed = collapsed
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-header
  width 100vw
  display flex
  align-items center
  justify-content space-between
  border-bottom 1px solid #E7E8F2
  position fixed
  top 0
  z-index 1500

.flex-row
  display flex
  align-items center

.m-0-12
  margin 0 12px

.layout-container
  margin-top 60px
  height calc(100vh - 60px)

.layout-content
  margin-left 200px
  background-color #F8F8F8
  height 100%
  overflow-y auto
  padding 21px 40px 0
  &::-webkit-scrollbar{
    width: 6px;
  }
  &::-webkit-scrollbar:horizontal{
    height: 8px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 6px;
    background-color: #ccc;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-corner{
    display: none;
  }

</style>
