<template>
  <span class="custom-tree-node">
    <Rank-Icon :rank="data.rank" class="m-r-10"/>
    <span v-html="highlight(likeCondition, data[this.label].split('&&')[0])"></span>
  </span>
</template>

<script>
import { highlight } from '@/utils/common.js'
import RankIcon from '@/components/RankIcon.vue'

export default {
  name: 'IndustrySelectTreeLabel',
  components: { RankIcon },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    likeCondition: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'label'
    }
  },
  methods: {
    highlight: highlight
  }
}
</script>

<style lang="stylus" scoped>
.custom-tree-node
  font-size 14px
  color $color-light-gary

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
