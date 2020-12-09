<template>
  <span class="rank-icon" v-if="rank === 1 || rank === '1'" style="color: #5B8FF9;">1</span>
  <span class="rank-icon" v-else-if="rank === '2' || rank === 2" style="color: #5AD8A6;">2</span>
  <span class="rank-icon" v-else-if="rank === '3' || rank === 3" style="color: #5D7092;">3</span>
  <span class="rank-icon" v-else style="color: #5B8FF9;">自</span>
</template>

<script>
export default {
  name: 'RankIcon',
  props: {
    rank: {
      type: [Number, String],
      default: 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.rank-icon
  display inline-block
  font-size 12px
  width 14px
  height 14px
  line-height 14px
  text-align center
  border-radius 10px
  background-color $base-white
</style>
