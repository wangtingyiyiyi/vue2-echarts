
<template>
  <div class="range-btn-wapper">
    <div style="margin-right: 10px">颗粒度</div>
    <el-button-group>
      <el-button
        v-for="item in graininessButtons"
        :key="item.value"
        size="mini"
        class="range-btn"
        :type="activeVal === item.value ? 'primary' : ''"
        @click="graininessClick(item)">{{item.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { GRAININESS_BUTTONS } from '@/utils/const.js'
export default {
  name: 'GraininessButtons',
  props: {
    activeVal: {
      type: String,
      default: 'month'
    }
  },
  data () {
    return {
      graininessButtons: GRAININESS_BUTTONS
    }
  },
  methods: {
    graininessClick (item) {
      this.$emit('handleGraininessClick', item)
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
