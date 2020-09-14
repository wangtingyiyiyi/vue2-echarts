<template>
  <div class="filter-group-btn-wapper">
    <div style="margin-right: 10px" class="filter-label">范围</div>
    <el-button-group>
      <el-button
        v-for="item in rangeButtons"
        :key="item.value"
        size="mini"
        class="filter-btn"
        :type="activeVal === item.value ? 'primary' : ''"
        @click="rangeClick(item)">{{item.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { RANGE_BUTTONS } from '@/utils/const.js'
export default {
  name: 'RangeButtons',
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
