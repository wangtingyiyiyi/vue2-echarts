<template>
  <div>
    <span>{{label}}</span>
    <el-tooltip effect="dark" :content="content" placement="top-start">
      <i class="el-icon-info m-l-5" style="color: #E8B45C"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TableHeaderTooltip',
  props: {
    label: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
