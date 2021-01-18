<template>
  <el-menu
    :default-active="activeMenu"
    :collapse-transition="false"
    background-color="#0065BD"
    text-color="#ffffff"
    active-text-color="#ffffff"
    :collapse="collapsed"
    @select="menuSelect">
    <el-menu-item v-for="item in menuData" :key="item.path" :index="item.name">
      <Svg-Icon :icon-class="item.meta.svgIcon" :class="[collapsed ? 'm-l-5' : '']" style="margin-top: 3px;"/>
      <span slot="title" style="margin-left: 15px; font-weight: 600">{{item.name}}</span>
    </el-menu-item>
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
    const route = this.$router.options.routes.find((item) => item.path === '/').children
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
