
<template>
  <div class="filter-group-btn-wapper">
    <div style="margin-right: 10px" class="filter-label">颗粒度</div>
    <el-button-group>
      <el-button
        v-for="item in groupButtons"
        :key="item.value"
        size="mini"
        class="filter-btn"
        :type="activeVal === item.value ? 'primary' : ''"
        @click="graininessClick(item)">{{item.label}}</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { GROUP_LEVEL } from '@/utils/const.js'
export default {
  name: 'groupButtons',
  props: {
    activeVal: {
      type: String,
      default: 'month'
    }
  },
  data () {
    return {
      groupButtons: GROUP_LEVEL
    }
  },
  methods: {
    graininessClick (item) {
      this.$emit('handleGroupClick', item)
    }
  }

}
</script>
