<template>
  <div class="index">
    <div class="login-wapper">
      <el-form :model="form" label-width="80px" label-position="left" class="login-form">
        <el-form-item label="账号">
          <el-input v-model="form.login"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.psw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
let target = {}
export default {
  data () {
    return {
      form: {},
      target: target
    }
  },
  methods: {
    onSubmit () {
      sessionStorage.setItem('token', 'ceshitoken')
      this.$message.success('hhh')
      this.$router.push({ name: this.target.name })
    }
  },
  beforeCreate () {
    target = this.$router.options.routes.find((item) => item.path === '/').children[0]
  }
}
</script>

<style lang="stylus" scoped>
.index
  height 100vh
  width 100vw
  display flex
  align-items center
  justify-content center

.login-wapper
  height 400px
  width 400px
  background-color $base-white-smoke

.login-form
  padding 20px

</style>
