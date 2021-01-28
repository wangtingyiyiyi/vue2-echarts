<template>
  <el-menu
    :default-active="activeMenu"
    :collapse-transition="false"
    background-color="#0065BD"
    text-color="#ffffff"
    active-text-color="#ffffff"
    :collapse="collapsed"
    @select="menuSelect">
     <el-submenu v-for="menu in menuData" :key="menu.path" :index="menu.path">
        <template slot="title">
          <Svg-Icon :icon-class="menu.meta.svgIcon" :class="[collapsed ? 'm-r-10' : 'm-r-10']"/>
          <span>{{menu.name}}</span>
        </template>
        <el-menu-item :index="item.name" v-for="item in menu.children" :key="item.path">
          <Svg-Icon :icon-class="item.meta.svgIcon" :class="[collapsed ? 'm-r-10' : 'm-r-10']"/>
          {{item.name}}
        </el-menu-item>
      </el-submenu>
  </el-menu>
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
    const route = this.$router.options.routes.filter(item => item?.meta?.isMenu)
    menuData = this._.filter(route, item => {
      return item.meta && (!item.meta.permission || item.meta.permission.includes(sessionStorage.getItem('type')))
    })
  }
}
</script>

<style lang="stylus" scoped>
.svg-icon
  vertical-align middle
.el-menu
  border-right none
  font-weight 500
  height calc(100% - 64px)
  .is-active
    background-color #0B78D8 !important
</style>
