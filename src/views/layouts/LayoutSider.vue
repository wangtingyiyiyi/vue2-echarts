<template>
  <el-aside :class="[collapsed ? 'width-63' : 'width-200', 'menu-asider']">
    <el-menu
      :default-active="activeMenu"
      :collapse-transition="false"
      :collapse="collapsed"
      @select="menuSelect">
      <el-menu-item v-for="item in menuData" :key="item.path" :index="item.name">
        <Svg-Icon :icon-class="item.meta.svgIcon" class="m-r-7"/>
        <span slot="title">
          <span>{{item.name}}</span>
          <span class="border"></span>
        </span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
let menuData = []
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menuData: menuData
    }
  },
  computed: {
    activeMenu () {
      return this.$route.name
    }
  },
  methods: {
    menuSelect (index, path) {
      if (this.$route.name !== index) {
        this.$router.push({ name: index })
      }
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>

<style lang="stylus" scoped>
.width-200
  width 200px !important
.width-63
  width 63px !important
.menu-asider
  position fixed
  height 100%
  z-index 3
  .el-menu
    height 100%
    border-right none
    .is-active
      .border
        width 2px
        height 20px
        background-color $base-blue
        display inline-block
        position absolute
        top 18px
        left 198px
</style>
