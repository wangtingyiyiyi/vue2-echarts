<template>
  <el-aside :class="[collapsed ? 'width-63' : 'width-180', 'menu-asider']">
    <el-menu
      :default-active="activeMenu"
      :collapse-transition="false"
      :collapse="collapsed"
      @select="menuSelect">
      <el-menu-item v-for="item in menuData" :key="item.path" :index="item.name" style="text" >
        <Svg-Icon :icon-class="item.meta.svgIcon" :class="[collapsed ? 'margin-left-5' : '']" style="margin-top: 3px;"/>
        <span slot="title" style="margin-left: 15px; font-weight: 600">
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
.margin-left-5
  margin-left 5px
.svg-icon
  vertical-align middle

.width-180
  width 180px !important
.width-63
  width 64px !important
.menu-asider
  position fixed
  /* height 100% */
  z-index 3
  .el-menu
    height 100%
    border-right none
    font-weight 500
    .el-menu-item
      color $color-second
      padding-left 25px !important
      .el-tooltip
        text-align center
    .is-active
      .border
        width 2px
        height 20px
        background-color $base-blue
        display inline-block
        position absolute
        top 18px
        left 178px

</style>
