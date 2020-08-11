<template>
  <div class="range-btn-wapper">
    <div style="margin-right: 10px">范围</div>
    <el-button-group>
      <el-button
        v-for="item in rangeButtons"
        :key="item.value"
        size="mini"
        class="range-btn"
        :type="activeVal === item.value ? 'primary' : ''"
        @click="rangeClick(item)">{{item.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { RANGE_BUTTONS } from '@/utils/const.js'
export default {
  props: {
    activeVal: {
      type: String,
      default: 'year'
    }
  },
  data () {
    return {
      rangeButtons: RANGE_BUTTONS
    }
  },
  methods: {
    rangeClick (item) {
      this.$emit('handleRangeClick', item)
    }
  }

}
</script>

<style lang="stylus" scoped>
.range-btn-wapper
  display flex
  align-items center
  color $base-gray
  font-size $font-size-12

</style>
