<template>
  <svg class="svg-icon" aria-hidden="true" :style="iconStyle">
    <use :xlink:href="`#icon-${iconClass}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconStyle: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>
.svg-icon {
  width: 10px;
  height: 10px;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
</style>
