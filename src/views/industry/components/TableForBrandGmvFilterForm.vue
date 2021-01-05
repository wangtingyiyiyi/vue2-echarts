<template>
  <el-popover
    placement="bottom"
    v-model="visible">
    <Svg-Icon
      icon-class="filter"
      slot="reference"
      style="margin-top: -1px"
      @click="visible = !visible"/>
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
        gmvStart: '',
        gmvEnd: ''
      },
      rules: {
        gmvStart: { trigger: 'change', validator: validateFees },
        gmvEnd: { trigger: 'change', validator: validateFees }
      }
    }
  },
  methods: {
    changeGmvFilter () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('changeGmvFilter', this.form)
          this.visible = false
          this.$refs.form.resetFields()
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
