<template>
  <div class="scroll-container beauty-scroll">
    <el-header class="header-wapper">
      <Header-Icon :collapsed="collapsed" @collapsChange="collapsChange"/>
      <div class="flex-row">
        <Header-Notice class="m-0-12"/>
        <Header-Avatar class="m-0-12"/>
        <Header-Setting class="m-0-12"/>
      </div>
    </el-header>
    <div class="main-wapper">
      <Layout-Sider :collapsed="collapsed"/>
      <Layout-Content :class="[ collapsed ? 'm-l-63' : 'm-l-200', 'content-wapper']"/>
    </div>
  </div>
</template>

<script>
import HeaderIcon from '@/views/layouts/header/HeaderIcon.vue'
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
      this.collapsed = !collapsed
    }
  }
}
</script>

<style lang="stylus" scoped>
.header-wapper
  width 100vw
  display flex
  align-items center
  justify-content space-between
  position fixed
  background-color #ffffff
  top 0
  z-index 1500
  padding 0 calc((100vw - 1440px) / 2)

.flex-row
  display flex
  align-items center

.main-wapper
  margin-top 60px
  max-width 1440px
  min-width 1200px
  margin 60px auto 0
  background-color #F8F8F8

.content-wapper
  padding 20px 0 0 20px
  background-color #F8F8F8

.m-l-200
  margin-left 200px
.m-l-63
  margin-left 63px

.scroll-container
  height 100vh
  overflow-x auto
</style>
