<template>
  <div>
    <div class="title">
      {{label}}
      <i class="el-icon-arrow-right"></i>
    </div>
    <el-tag
      v-for="item in list"
      :key="item[labelKey]"
      type="info">{{item[labelKey]}}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'PartFrequency',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  color $color-second
  margin-bottom 8px
</style>
