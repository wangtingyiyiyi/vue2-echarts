<template>
  <span class="custom-tree-node">
    <span class="tree-select-icon" v-if="data.rank === '1' || data.rank === 1" style="color: #5B8FF9;">{{data.rank}}</span>
    <span class="tree-select-icon" v-else-if="data.rank === '2' || data.rank === 2" style="color: #5AD8A6;">{{data.rank}}</span>
    <span class="tree-select-icon" v-else-if="data.rank === '3' || data.rank === 3" style="color: #5D7092;">{{data.rank}}</span>
    <span class="tree-select-icon" v-else style="color: #5B8FF9;">自</span>
    <span v-html="highlight(likeCondition, data.label)"></span>
  </span>
</template>

<script>
export default {
  name: 'IndustrySelectTreeLabel',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    likeCondition: {
      type: String,
      default: ''
    }
  },
  methods: {
    highlight (keyWord, label) {
      const mes = label.replace(new RegExp(`(${keyWord})`, 'gi'), "<span style='background: rgba(255, 214, 0, 0.4); font-weight: inherit'>$1</span>")
      return '<span style="font-weight: inherit">' + mes + '</span>'
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom-tree-node
  font-size 14px
  color $color-cate-gary

.tree-select-icon
  display inline-block
  margin-right 10px
  font-size 12px
  width 14px
  height 14px
  line-height 14px
  text-align center
  border-radius 10px
  background-color $base-white
</style>
