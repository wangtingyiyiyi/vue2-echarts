<template>
  <el-dropdown @command="handleCommand">
    <span><i class="el-icon-caret-bottom" style="cursor: pointer; color: #fff"></i></span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="LogOut">
        <Svg-Icon icon-class="logout" style="margin-right: 10px"/>退出登录</el-dropdown-item>
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
      if (command === 'LogOut') {
        this.logOut().then(() => { this.$router.push('/Login') })
        return
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
