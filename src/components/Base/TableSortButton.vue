<template>
  <div class="sort-button">
    <slot name="prepend"></slot>
    <div @click="handleSort">
      <span>{{title}}</span>
      <Svg-Icon
        icon-class="descending"
        :class="[activedSortKey == this.sortVal ? 'active-sort' : '']"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSortButton',
  props: {
    title: {
      type: String,
      default: ''
    },
    sortVal: {
      type: String,
      default: 'gmv'
    },
    activedSortKey: {
      type: String,
      default: 'gmv'
    }
  },
  methods: {
    handleSort () {
      this.$emit('handleSort', this.sortVal)
    }
  }
}
</script>

<style lang="stylus" scoped>
.sort-button
  cursor pointer
  display flex
  align-items center
  justify-content flex-end

.active-sort
  color $base-blue
</style>
