<template>
  <el-popover
    placement="bottom"
    v-model="visible">

    <Svg-Icon
      icon-class="filter"
      slot="reference"
      style="margin-top: -1px; float:right"
      @click="visible = !visible"/>
           <!-- <el-button  type="text" style="border:none; color:#878999;font-weight: bolder; float:right; height: 22px; line-height: 22px; padding: 0; min-width: 0" slot="reference">{{form.gmvMark}}</el-button> -->

           <!-- <el-button  type="text"  @click="clickPopover" style="background: #E1E2E3; border-radius: 2px; height: 22px; line-height: 22px; padding: 0 3px; min-width: 20px;" slot="reference">{{form.gmvMark}}
             <Svg-Icon
      icon-class="filter"
      style="margin-top: 3px; float:right"
     />
           </el-button> -->
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      :rules="rules"
      class="popper-form">
      <el-form-item prop="gmvStart" >
        <el-input v-model="form.gmvStart" placeholder="最小值" style="width: 120px"></el-input>
      </el-form-item>
      <el-form-item> - </el-form-item>
      <el-form-item prop="gmvEnd">
        <el-input v-model="form.gmvEnd" placeholder="最大值" style="width: 120px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeGmvFilter">过滤</el-button>
      </el-form-item>
    </el-form>
  </el-popover>
</template>

<script>
import { gmvMarkFormatter } from '@/utils/filter.js'

export default {
  name: 'TableForBrandGmvFilterForm',
  data () {
    const validateFees = (rules, value, callback) => {
      if (isNaN(value) && value !== '') {
        callback(new Error('请输入正确的数字'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      form: {
        gmvMark: '',
        gmvStart: '',
        gmvEnd: ''
      },
      rules: {
        gmvStart: { trigger: 'change', validator: validateFees },
        gmvEnd: { trigger: 'change', validator: validateFees }
      }
    }
  },
  watch: {
    visible: {
      handler: function () {
        console.log('揍我了', this.visible)
        if (this.visible) {
          this.$refs.form.validate((valid) => {
            this.$refs.form.resetFields()
            this.$emit('changeGmvFilter', this.form)
            this.form.gmvMark = ''
          })
        }
      }
    }
  },
  methods: {
    // clickPopover () {
    //   console.log('点击前', this.visible)
    //   // if (this.visible) {
    //   this.$refs.form.validate((valid) => {
    //     this.$refs.form.resetFields()
    //   })
    //   // }
    //   this.visible = false
    //   console.log('点击', this.visible)
    // },
    changeGmvFilter () {
      console.log('点击!!!!', this.visible)
      this.$emit('changeGmvFilter', this.form)

      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.gmvStart && this.form.gmvEnd) {
            this.form.gmvMark = gmvMarkFormatter(this.form.gmvStart) + ' - ' + gmvMarkFormatter(this.form.gmvEnd)
          } else if (this.form.gmvStart && !this.form.gmvEnd) {
            this.form.gmvMark = ' > ' + gmvMarkFormatter(this.form.gmvStart)
          } else if (!this.form.gmvStart && this.form.gmvEnd) {
            this.form.gmvMark = ' < ' + gmvMarkFormatter(this.form.gmvEnd)
          } else {
            this.form.gmvMark = ''
          }
          this.$emit('changeGmvFilter', this.form)
          this.visible = false
          // this.$refs.form.resetFields()
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.el-popover > .popper-form
  .el-form-item
    margin-bottom 0px
    &:last-child
      margin-right 0px
</style>
