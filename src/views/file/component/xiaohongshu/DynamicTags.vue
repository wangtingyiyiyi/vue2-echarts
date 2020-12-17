<template>
  <div>
    <el-tag
      class="m-t-5"
      v-for="(tag, index) in value"
      :key="tag + index"
      closable
      :disable-transitions="false"
      @close="handleClose(tag, index)">
      {{tag}}
    </el-tag>
    <el-input
      class="el-input--tiny input-new-tag m-t-5"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm">
    </el-input>
    <el-button
      v-else
      class="el-button--dashed m-t-5"
      style="padding: 5px 10px"
      @click="showInput">+ 关键字</el-button>
  </div>
</template>

<script>
export default {
  name: 'DynamicTag',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    k: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose (tag, i) {
      this.$emit('handleCloseKeyWord', this.index, this.k, i)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.$emit('handlePushKeyWord', this.index, this.k, inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-tag
    margin-right: 10px;
    // margin-bottom 5px

  .el-input--tiny >>>
    .el-input__inner
      height 24px
      line-height 24px
  .input-new-tag
    width: 90px;
    vertical-align: bottom
    // margin-bottom 5px
</style>
