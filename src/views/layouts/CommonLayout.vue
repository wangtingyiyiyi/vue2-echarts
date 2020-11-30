<template>
  <div class="scroll-container beauty-scroll">
    <el-header class="header-wapper">
      <Header-Icon :collapsed="collapsed" @collapsChange="collapsChange"/>
      <div class="flex-row">
        <div class="m-0-12">{{userName}}</div>
        <Header-Setting class="m-0-12"/>
      </div>
    </el-header>
    <div class="main-wapper">
      <Layout-Sider :collapsed="collapsed"/>
      <Layout-Content
        :collapsed="collapsed"
        class="content-wapper"/>
      <Layout-Footer />
    </div>
  </div>
</template>

<script>
import HeaderIcon from '@/views/layouts/header/HeaderIcon.vue'
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
.header-wapper
  box-shadow 0 2px 8px #f0f1f2;
  width 100vw
  display flex
  align-items center
  justify-content space-between
  position fixed
  background-color #ffffff
  top 0
  z-index 2
  padding 0px 20px

.flex-row
  display flex
  align-items center

.main-wapper
  margin-top 60px
  width 100%
  margin 60px auto 0
  background-color $base-white
  min-height calc(100vh - 60px)

.content-wapper
  padding 20px 33px 0 20px
  background-color $base-white
  min-height calc(100vh - 150px)

.scroll-container
  height 100vh
  overflow-x auto

</style>
