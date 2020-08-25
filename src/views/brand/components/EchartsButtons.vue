<template>
  <div class="range-btn-wapper">
    <el-button-group>
      <el-button
        v-for="item in EchartsButtons"
        :key="item.value"
        size="mini"
        class="range-btn"
        :type="activeVal === item.value ? 'primary' : ''"
        @click="click(item)">{{item.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { ECHARTS_BUTTONS } from '@/utils/const.js'
export default {
  name: 'EchartsButtons',
  props: {
    activeVal: {
      type: String,
      default: 'sumSalescount'
    }
  },
  data () {
    return {
      EchartsButtons: ECHARTS_BUTTONS
    }
  },
  methods: {
    click (item) {
      this.$emit('handleEchartsClick', item)
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
