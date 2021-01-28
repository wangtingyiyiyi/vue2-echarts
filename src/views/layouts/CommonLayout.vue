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
    <div>
      <router-view name="header"/>
      <div class="main-wapper beauty-scroll" id="main-wapper">
        <div class="content-wapper" style="max-width: 1608px; min-width: 1240px; ">
          <router-view :key="key" />
        </div>
      <!-- <Layout-Footer /> -->
    </div>
    </div>
    <el-backtop target=".main-wapper"></el-backtop>
  </div>
</template>

<script>
import HeaderSetting from '@/views/layouts/header/HeaderSetting.vue'
import SiderMenu from '@/views/layouts/SiderMenu.vue'
import HeaderIcon from '@/views/layouts/header/HeaderIcon.vue'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      collapsed: false,
      userName: sessionStorage.getItem('userName')
    }
  },
  components: {
    HeaderIcon, SiderMenu, HeaderSetting
  },
  computed: {
    key () {
      return this.$route.path
    }
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
  padding 0px 28px 0 16px
  background-color $base-white
  min-height calc(100vh - 64px)
  max-width 1608px
  min-width 1240px
  overflow auto
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
