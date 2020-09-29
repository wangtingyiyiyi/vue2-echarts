<template>
  <div class="index">
    <div class="login-wapper">
      <div class="qr-wapper" @click="changeLoginType">
        <Svg-Icon icon-class="qrcode" class="qr-code"/>
      </div>
      <el-form :model="form" label-position="left" class="login-form" size="large" v-if="isPsw">
        <div class="title">久谦中台数据库</div>
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" show-password placeholder="请输入登陆密码"  @click.enter.native="onSubmit"></el-input>
        </el-form-item>
        <div class="flex-between">
          <el-button type="primary" size="medium" class="login-btn" @click="onSubmit">登陆</el-button>
          <div class="empty-space"></div>
          <el-button type="text" size="medium" class="apply-btn" @click="onSubmit">申请试用</el-button>
        </div>
      </el-form>
      <div v-if="!isPsw">
        企业微信扫码登陆
      </div>
    </div>
  </div>
</template>

<script>
// import { loginApi } from '@/api/login'
import { mapActions } from 'vuex'

let target = {}
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      target: target,
      isPsw: true

    }
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit () {
      this.login(this.form)
        .then(() => {
          this.$router.push({ name: this.target.name })
        })
        .catch(() => {
          this.$message.error('登陆失败')
        })
    },
    changeLoginType () {
      this.isPsw = !this.isPsw
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
  height 350px
  width 510px
  background-color #fff

.login-form
  padding 54px 92px

.title
  font-size 18px
  color #181818
  margin-bottom 31px

.apply-btn
  border 1px solid $color-border

.flex-between
  width 100%
  display flex
  align-items baseline
  justify-content flex-start
  .login-btn
    width 47%
  .empty-space
    min-width 6%
  .apply-btn
    width 47%

.qr-wapper
  width 40px
  height 40px
  background-color #dfdfdf
  padding 5px 5px 10px 10px
  float right
  position relative
  cursor pointer
  &::before
    content: "";
    position: absolute;
    left: -26px;
    top: 21.7px;
    display: block;
    width: 78px;
    height: 40px;
    background: #fff;
    transform: rotate(45deg);
.qr-code
  width 100%
  height 100%
  color #8A8A8A
</style>
