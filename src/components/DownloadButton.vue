
<template>
<div>
  <div class="download-button fixed-position" v-show="loadingProgress === 0 || loadingProgress === 1">
    <i :class="['el-icon-loading', 'icon-class']"></i>
  </div>
  <div class="svg-wapper fixed-position" v-show="loadingProgress !== 0 && loadingProgress !== 1">
    <svg width="60" height="60">
      <circle cx="30" cy="30" r="30" stroke-width="5.5" stroke="#e5e5e5" fill="none"></circle>
      <circle cx="30" cy="30" r="30" ref="circle"  stroke-width="5.5" stroke="#5B8FF9" fill="none"  stroke-dasharray="0 251"></circle>
    </svg>
    <i :class="['el-icon-download', 'icon-class']"></i>
  </div>
</div>

</template>

<script>
export default {
  name: 'DownloadButton',
  props: {
    loadingProgress: {
      type: Number,
      default: 0
    }
  },
  watch: {
    loadingProgress: {
      handler: function (loadingProgress) {
        if (loadingProgress !== 0) {
          const circle = this.$refs.circle
          const percent = loadingProgress // 进度
          const perimeter = Math.PI * 2 * 30 // 周长
          circle.setAttribute('stroke-dasharray', perimeter * percent + ' ' + perimeter * (1 - percent))
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
circle {
    -webkit-transition: stroke-dasharray .25s;
    transition: stroke-dasharray .25s;
}
svg
  -webkit-transform rotate(-90deg)
  transform rotate(-90deg)
  box-shadow 0px 0px 20px #00000019
  border-radius 50%

.download-button
  color $base-blue
  width 60px
  height 60px
  background-color #ffffff
  border-radius 50%
  box-shadow 0px 0px 20px #00000019
  display flex
  align-items center
  justify-content center
  clip-path: circle(90%)

.icon-class
  color $base-blue
  font-size 26px
  font-weight 900
  position absolute
  top 26%
  left 0
  text-align center
  margin 0
  width 100%

.svg-wapper
  position fixed
  bottom 80px
  right 40px

.fixed-position
  position fixed
  bottom 80px
  right 40px
</style>
