<template>
  <i
    @click="collapsClick"
    :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
</template>

<script>
export default {
  name: 'HeaderTrigger',
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    collapsClick () {
      this.collapsed = !this.collapsed
      this.$emit('collapsChange', this.collapsed)
    }
  }
}
</script>
