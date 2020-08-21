<template>
  <el-aside class="menu-asider" style="width: 200px">
    <el-menu
      :default-active="activeMenu"
      :collapse-transition="false"
      :collapse="collapsed"
      @select="menuSelect">
      <el-menu-item v-for="item in menuData" :key="item.path" :index="item.name">
        <Svg-Icon :icon-class="item.meta.svgIcon" class="m-r-7"/>
        <span slot="title">{{item.name}}</span>
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
      this.$router.push({ name: index })
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>

<style lang="stylus" scoped>

.menu-asider
  position fixed
  height 100%
  .el-menu
    height 100%
</style>
