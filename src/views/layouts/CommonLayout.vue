<template>
  <div class="scroll-container beauty-scroll">
    <el-header class="header-wapper">
      <Header-Icon :collapsed="collapsed" @collapsChange="collapsChange"/>
      <div class="flex-row">
        <!-- <Header-Notice class="m-0-12"/> -->
        <!-- <Header-Avatar class="m-0-12"/> -->
        <div class="m-0-12">{{userName}}</div>
        <Header-Setting class="m-0-12"/>
      </div>
    </el-header>
    <div class="main-wapper">
      <Layout-Sider :collapsed="collapsed"/>
      <Layout-Content :collapsed="collapsed" :class="[ collapsed ? 'm-l-63' : 'm-l-200', 'content-wapper']"/>
    </div>
    <Layout-Footer />
  </div>
</template>

<script>
import HeaderIcon from '@/views/layouts/header/HeaderIcon.vue'
// import HeaderAvatar from '@/views/layouts/header/HeaderAvatar.vue'
// import HeaderNotice from '@/views/layouts/header/HeaderNotice.vue'
import HeaderSetting from '@/views/layouts/header/HeaderSetting.vue'
import LayoutSider from '@/views/layouts/LayoutSider.vue'
import LayoutContent from '@/views/layouts/LayoutContent.vue'
import LayoutFooter from '@/views/layouts/LayoutFooter.vue'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      collapsed: false,
      userName: sessionStorage.getItem('userName')
    }
  },
  components: {
    HeaderIcon, HeaderSetting, LayoutSider, LayoutContent, LayoutFooter
  },
  methods: {
    ...mapMutations('sys', ['SET_SYS_COLLAPSED']),
    collapsChange (collapsed) {
      this.collapsed = !collapsed
      this.SET_SYS_COLLAPSED(collapsed)
    }
  }
}
</script>

<style lang="stylus" scoped>

html {
  overflow-x: hidden;
  overflow-y: auto;
}
body {
  width: 100vw;
  overflow: hidden;
  padding-left: calc(100vw - 100%);
}
.header-wapper
  box-shadow 0 2px 8px #f0f1f2;
  width 100vw
  display flex
  align-items center
  justify-content space-between
  position fixed
  background-color #ffffff
  top 0
  z-index 1500
  padding 0 calc((100vw - 1600px) / 2)

.flex-row
  display flex
  align-items center

.main-wapper
  margin-top 60px
  max-width 1600px
  min-width 1200px
  margin 60px auto 0
  background-color $base-white
  min-height calc(100vh - 157px)

.content-wapper
  padding 20px 0 0 0px
  background-color $base-white

.scroll-container
  height 100vh
  overflow-x auto
</style>
