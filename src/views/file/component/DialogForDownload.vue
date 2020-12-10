<template>
  <transition name="fade">
    <el-dialog
      width="550px"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :destroy-on-close="true">
      <div slot="title">保存导出信息</div>
      <el-form ref="form" :model="form" label-width="60px" label-position="left">
        <el-form-item label="标题" prop="title" :rules="{ required: true, message: '请输入标题', trigger: 'blur' }">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </span>
    </el-dialog>
  </transition>
</template>

<script>
export default {
  name: 'DialogForDownload',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {}
    }
  },
  methods: {
    handleClose () {
      this.form = {}
      this.$emit('handleClose', false)
    },
    handleSave () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('handleSave', this.form)
          this.$emit('handleClose', false)
        }
      })
    }
  },
  beforeDestroy () {
    this.form = {}
  }
}
</script>
