<template>
  <div class="index" ref="index">
    <!-- 一般用户 -->
    <div class="login-wapper" v-show="userFrom === 'normal'">
      <div class="qr-wapper" @click="changeLoginType">
        <Svg-Icon icon-class="qrcode" class="qr-code"/>
      </div>
      <el-form :model="form" ref="form" :rules="rules" label-position="left" class="login-form" size="large" v-show="isPsw">
        <div class="title">{{appName}}</div>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password placeholder="请输入登陆密码" @keydown.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-button type="primary" size="medium" class="login-btn" @click="onSubmit">登陆</el-button>
        </el-form>
        <div v-show="!isPsw" class="wxCode">
          <div id="wx_qrcode"></div>
        </div>
    </div>
    <div v-show="userFrom === 'query'">
      正在进入{{appName}}<i class="el-icon-loading loading-icon"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { refLoading } from '@/utils/element.js'
import { APP_NAME } from '@/utils/const.js'

let target = {}
const query = {}
export default {
  data () {
    return {
      // 翟迅_测试/123456
      form: {
        username: '',
        password: ''
      },
      target: target,
      isPsw: true,
      rules: {
        username: { required: true, message: '请输入账号', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      },
      userFrom: 'normal',
      query: query,
      appName: APP_NAME
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (route) {
        const query = route.query
        if (query.userId) { // cms导入用户
          this.userFrom = 'query'
          this.handleQueryLogin({ userId: query.userId })
        } else if (query.code) { // 企业微信扫码用户
          this.userFrom = 'query'
          this.handleQueryLogin(query)
        } else {
          this.userFrom = 'normal'
          console.info('query 空参数')
        }
      }
    }
  },
  methods: {
    ...mapActions('user', ['login', 'cmsLogin']),
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.handleLogin(this.form)
        }
      })
    },
    handleLogin (param) {
      const loadingInstance = refLoading(this.$refs.index, '正在加载')
      this.login(param)
        .then(() => {
          loadingInstance.close()
          this.$router.push({ name: this.target.name })
        })
        .catch((err) => {
          loadingInstance.close()
          this.$message.error(err.message)
          this.$router.push('Login')
        })
    },
    handleQueryLogin (param) {
      this.login(param)
        .then(() => { this.$router.push({ name: this.target.name }) })
        .catch((err) => {
          this.$message.error(err.message)
          this.$router.push('Login')
        })
    },
    changeLoginType () {
      this.isPsw = !this.isPsw
    },
    wechatLogin () {
      window.a = window.WwLogin({
        id: 'wx_qrcode',
        appid: 'ww7f4fe84bdcd3e434',
        agentid: '1000022',
        redirect_uri: encodeURI('https://exp.meritco-group.com:9580/login'),
        state: 'STATE',
        href: ''
      })
    }
  },
  beforeCreate () {
    target = this.$router.options.routes.find((item) => item.path === '/').children[0]
  },
  mounted () {
    this.wechatLogin()
    console.info(this)
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
  height 450px
  width 510px
  background-color #fff

.login-form
  padding 74px 92px

.title
  font-size 18px
  color #181818
  margin-bottom 31px

.apply-btn
  border 1px solid $color-border

.login-btn
  width 100%

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

.wxCode
  padding-left 108px
  padding-top 30px

.loading-icon
  color $base-blue
  margin-left 5px
</style>
