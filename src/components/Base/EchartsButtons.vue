<template>
  <div class="filter-group-btn-wapper">
    <el-button-group>
      <el-button
        v-for="item in EchartsButtons"
        :key="item.value"
        size="mini"
        class="filter-btn"
        :type="activeVal === item.value ? 'primary' : ''"
        @click="click(item)">{{item.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { VIEW_LEVEL } from '@/utils/const.js'
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
      EchartsButtons: VIEW_LEVEL
    }
  },
  methods: {
    click (item) {
      this.$emit('handleEchartsClick', item)
    }
  }

}
</script>
