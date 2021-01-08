<template>
  <el-form :model="form">
    <el-form-item label="行业">
      <el-select v-model="form.cate">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CateForm',
  data () {
    return {
      form: {}
    }
  }
}
</script>
