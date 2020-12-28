<template>
  <div>
    <el-input
      class="el-input--tiny input-new-tag m-t-5"
      v-if="inputVisible"
      :value="value"
      ref="saveInput"
      size="mini"
      @input="handleInput"
      @keyup.enter.native="$event.target.blur"
      @focus="handleFocus"
      @blur="handleInputConfirm"></el-input>
    <div
      v-if="!inputVisible && value"
      class="text-button"
      @click="showInput" >{{value}}</div>
    <div
      v-if="!inputVisible && !value"
      class="text-button"
      @click="showInput">添加</div>
  </div>
</template>

<script>
export default {
  name: 'DynamicInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      inputVisible: false
    }
  },
  methods: {
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveInput.$refs.input.focus()
      })
    },
    handleFocus () {
      this.$emit('handleInputFocus', event.target.value, this.index)
    },
    handleInputConfirm () {
      this.inputVisible = false
      this.$emit('handleInputConfirm', event.target.value, this.index)
    },
    handleInput () {
      this.$emit('handleInput', event.target.value, this.index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-input--tiny >>>
    .el-input__inner
      height 24px
      line-height 24px
  .input-new-tag
    width: 90px;
    vertical-align: bottom
  .text-button
    color $color-light-gary
    cursor pointer
    padding 4px 0
    &:hover
      color $base-blue
</style>
