<template>
  <div class="download-button">
    <i class="el-icon-download icon-class"></i>
  </div>
</template>

<script>
export default {
  name: 'DownloadButton'
}
</script>

<style lang="stylus" scoped>
.download-button
  color $base-blue
  position fixed
  bottom 82px
  right 20px
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
  font-size 26px
  font-weight 900
</style>
