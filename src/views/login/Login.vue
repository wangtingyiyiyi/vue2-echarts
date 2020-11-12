<template>
  <div class="index" ref="index">
    <!-- 一般用户 -->
    <div v-show="!isPc">
      <div style="display: block; margin: auto; width: 200px; height: 200px;">
        <div style="font-size: 20px; font-weight: 400; color: #363746; line-height: 40px; text-align: center">请移步PC端查看</div>
        <div style="font-size: 10px; font-weight: 400; color: #363746; margin-top: 0px; line-height: 40px; text-align: center">https://exp.meritco-group.com:9580</div>
        <el-button type="primary" style="width: 120px; margin-left: 40px; margin-top: 30px;" size="medium" class="copyBtn" v-clipboard:copy="copyUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制链接</el-button>
      </div>
    </div>
    <div v-show="isPc" style="width: 100%; height: 100%;">
      <div class="top">
        <Svg-Icon
      :icon-class="'logo'"
      :class="'svg-class'"/>
      </div>
      <div class="title">{{isPsw ? appName : appName}}</div>
      <div class="login-wapper" v-show="userFrom === 'normal'">
        <!-- <div class="qr-wapper" @click="changeLoginType">
          <Svg-Icon icon-class="qrcode" class="qr-code"/>
        </div> -->
        <el-form :model="form" ref="form" :rules="rules" label-position="left" class="login-form" size="large" v-show="isPsw">
          <el-form-item prop="username" >
            <el-input v-model="form.username" class="login-input" placeholder="请输入账号">
              <Svg-Icon
              icon-class="loginUser"
              slot="prefix"
              />
            </el-input>
          </el-form-item>
          <el-form-item prop="password" >
            <el-input v-model="form.password" :type="inputType" class="login-input" placeholder="请输入登录密码" @keydown.enter.native="onSubmit">
              <Svg-Icon
              icon-class="loginPassword"
              slot="prefix"
              />
              <div slot="suffix"
              v-if="inputType === 'text'" @click="inputType = 'password'">
                <Svg-Icon
              icon-class="loginEve"
              />
              </div>
              <div slot="suffix"
              v-if="inputType === 'password'"  @click="inputType = 'text'">
                <Svg-Icon
              icon-class="loginEveB"
              />
              </div>
            </el-input>
          </el-form-item>
          <el-checkbox style="margin-left: 200px; margin-top: 0px;" v-model="rememberPassword">记住密码</el-checkbox>
          <el-button type="primary" style="margin-top: 40px;" size="medium" class="login-btn" @click="onSubmit">登录</el-button>
          </el-form>
          <div v-show="!isPsw" class="wxCode">
            <div id="wx_qrcode"></div>
          </div>
      </div>
      <div @click="changeLoginType" class="footer">{{isPsw ? '切换至企业微信登录' : '切换至账号登录'}}</div>
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
      rememberPassword: false,
      isPc: true,
      inputType: 'password',
      copyUrl: 'https://exp.meritco-group.com:9580/',
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
          this.handleCmsLogin({ userId: query.userId })
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
    // 账户密码
    handleLogin (param) {
      const loadingInstance = refLoading(this.$refs.index, '正在加载')
      this.login(param)
        .then(() => {
          loadingInstance.close()
          this.$router.push({ name: this.target.name })
          if (!window.localStorage) {
            return false
          } else {
            var storage = window.localStorage
            if (this.rememberPassword) {
              storage.username = this.form.username
              storage.password = this.form.password
              storage.rememberPassword = this.rememberPassword
            } else {
              storage.username = null
              storage.password = null
              storage.rememberPassword = null
            }
          }
        })
        .catch((err) => {
          loadingInstance.close()
          this.$message.error(err.message)
          this.$router.push('Login')
        })
    },
    // 二维码回调
    handleQueryLogin (param) {
      this.login(param)
        .then(() => { this.$router.push({ name: this.target.name }) })
        .catch((err) => {
          this.$message.error(err.message)
          this.$router.push('Login')
        })
    },
    // cms导入
    handleCmsLogin (param) {
      this.cmsLogin(param)
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
    },
    initForm () {
      // 判断是否是移动设备
      var userAgent = navigator.userAgent
      var Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod']
      for (var v = 0; v < Agents.length; v++) {
        if (userAgent.indexOf(Agents[v]) > 0) {
          this.isPc = false
          break
        }
      }
      // alert('是否是PC:' + this.isPc)
      // console.log('是否是PC:', this.isPc)
      if (process.env.NODE_ENV === 'development') {
        this.form = {
          // username: '翟迅_测试',
          // password: '123456'
        }
      }
      if (!window.localStorage) {
        return false
      } else {
        const storage = window.localStorage
        if (!(storage.username === 'null' && storage.password === 'null')) {
          this.form = {
            username: storage.username,
            password: storage.password
          }
          storage.rememberPassword === 'true' ? this.rememberPassword = true : this.rememberPassword = false
        }
      }
    },
    onCopy (e) {
      this.$message.success('内容已复制')
    },
    onError (e) {
      this.$message.error('复制失败')
    }
  },

  beforeCreate () {
    target = this.$router.options.routes.find((item) => item.path === '/').children[0]
  },
  mounted () {
    this.wechatLogin()
    this.initForm()
  }
}
</script>

<style lang="stylus" scoped>
.logo {
  background: $base-blue;
  color: #ffffff;
  padding: 4px 28px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svg-class
  width 109px
  height 36px
  margin 15px 20px 0 20px

.expansion-logo {
  padding: 0 20px;
  div {
    width: 140px;
  }
}
.index
  height 100vh
  width 100vw
  display flex
  align-items center
  justify-content center

.login-wapper
  display block
  margin auto
  height 420px
  width 388px
  background-color #fff

.login-form
  padding 114px 50px 74px 50px

.top
  height 60px
  padding: 0 calc((100vw - 1600px) / 2)
  box-shadow: 0 2px 8px #f0f1f2
  background #FFFFFF

.footer
  height 22px
  font-size 16px
  font-weight 400
  color #495670
  line-height 22px
  text-decoration underline
  text-align center
  width 180px
  display block
  margin auto
  margin-top 20px
  cursor pointer

.title
  margin-top calc((100vh - 670px - 60px) / 2 - 0px)
  margin-bottom 40px
  font-size 26px
  font-weight 400
  color #363746
  line-height 40px
  text-align: center

.apply-btn
  border 1px solid $color-border

.login-btn
  width 100%
  box-shadow: 0px 4px 12px rgba(51, 81, 143, 0.2)

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
  padding-left 44px
  padding-top 30px

.wxCode >>>
  .qrcode
    width 100px

.loading-icon
  color $base-blue
  margin-left 5px

.login-input >>>
  .el-input__inner
    color #363746
    font-weight 450
    height 32px
    border none
    font-size 16px
    border-bottom 1px solid #DCDFE6

.el-icon-minus
  -webkit-text-security: none

.el-icon-view
  -webkit-text-security: disc

</style>
