<template>
  <el-dropdown @command="handleCommand">
    <span><i class="el-icon-caret-bottom"></i></span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in menuData"
        :key="item.path"
        :icon="item.meta.icon"
        :command="item.name">{{item.name}}</el-dropdown-item>
      <el-dropdown-item divided icon="el-icon-star-off" command="Login">退出登陆</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapActions } from 'vuex'
let menuData = []
export default {
  data () {
    return {
      menuData: menuData
    }
  },
  methods: {
    ...mapActions('user', ['logOut']),
    handleCommand (command) {
      if (command === 'Login') {
        this.logOut()
      }
      if (this.$route.name !== command) {
        this.$router.push({ name: command })
      }
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/user').children
  }
}
</script>
