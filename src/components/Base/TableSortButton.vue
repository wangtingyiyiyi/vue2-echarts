<template>
  <div class="sort-button"  @click="handleSort">{{title}}
    <Svg-Icon icon-class="descending" :class="[activedSortKey == this.sortVal ? 'active-sort' : '']"/>
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

.active-sort
  color $base-blue
</style>
