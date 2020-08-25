<template>
  <div class="brands-wapper">
    <div
      v-for="item in brands"
      :key="item.brandId"
      :class="['brand-item', activeBrand === item.brandId ? 'actived' : '']"
      @click="click(item)">{{item.brandName}}</div>
  </div>
</template>

<script>
export default {
  name: 'BrandTableBrands',
  props: {
    brands: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeBrand: ''
    }
  },
  methods: {
    click (item) {
      this.activeBrand = item.brandId
      this.$emit('changeActiveBrand', item)
    }
  },
  mounted () {
    this.activeBrand = this.brands[0].brandId
  }
}
</script>

<style lang="stylus" scoped>
.brands-wapper
  display flex
  margin-right 20px

.brand-item
  margin-right 20px
  padding  0 1px 3px
  cursor pointer

.actived
  border-bottom 2px solid $base-blue
</style>
