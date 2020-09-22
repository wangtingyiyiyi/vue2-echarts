<template>
  <div class="brands-wapper">
    <div
      v-for="item in brands"
      :key="item.brandId"
      :class="['brand-item', activeBrand.brandId === item.brandId ? 'actived' : '']"
      @click="click(item)">{{item.brand}}</div>
  </div>
</template>

<script>
export default {
  name: 'BrandTableBrands',
  props: {
    brands: {
      type: Array,
      default: () => []
    },
    activeBrand: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    click (item) {
      this.$emit('changeActiveBrand', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.brands-wapper
  display flex
  margin-right 20px

.brand-item
  margin-right 70px
  padding  0 1px 10px
  cursor pointer
  font-size 12px
  text-align center
  color $color-second

.actived
  border-bottom 2px solid $base-blue
  color $base-blue
</style>
