<template>
  <div class="body-wapper" ref="body">
    <el-aside :class="[collapsed ? 'width-63' : 'width-200']">
      <Header-Icon :collapsed="collapsed" @collapsChange="collapsChange"/>
      <Sider-Menu :collapsed="collapsed"/>
      <div class="user-wapper">
        <div class="m-0-12" style="color: #ffffff">{{userName}}</div>
        <Header-Setting/>
      </div>
    </el-aside>
    <div class="main-wapper beauty-scroll">
      <Layout-Content class="content-wapper"/>
      <Layout-Footer />
    </div>
    <el-backtop target=".main-wapper"></el-backtop>
  </div>
</template>

<script>
import HeaderSetting from '@/views/layouts/header/HeaderSetting.vue'
import SiderMenu from '@/views/layouts/SiderMenu.vue'
import HeaderIcon from '@/views/layouts/header/HeaderIcon.vue'
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
    HeaderIcon, LayoutContent, LayoutFooter, SiderMenu, HeaderSetting
  },
  methods: {
    ...mapMutations('sys', ['SET_SYS_COLLAPSED', 'SET_SYS_SCROLLTOP']),
    collapsChange (collapsed) {
      this.collapsed = !collapsed
      this.SET_SYS_COLLAPSED(collapsed)
    },
    handleScroll () {
      this.SET_SYS_SCROLLTOP(this.$refs.body.scrollTop)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="stylus" scoped>
.body-wapper
  width 100vw
  min-height 100vh
  background-color $base-white
  display flex

.content-wapper
  padding 00px 33px 0 20px
  background-color $base-white
  min-height calc(100vh - 88px)
  overflow visible
  max-width 1608px
  overflow-x auto
  margin 0 auto

.width-200
  width 200px !important

.width-63
  width 64px !important

.user-wapper
  position absolute
  bottom 0
  height 40px
  display flex
  align-items center
.main-wapper
  width calc(100vw - 200px)
  height 100vh
  overflow-y auto
</style>
