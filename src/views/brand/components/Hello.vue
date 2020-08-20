<template>
  <el-button type="primary" @click="btnClick">text, {{name}}, {{$attrs.hello}}122</el-button>
</template>

<script>
export default {
  inject: ['name'],
  methods: {
    btnClick () {
      this.$emit('handleBtnClick', name)
    }
  }
}
</script>
