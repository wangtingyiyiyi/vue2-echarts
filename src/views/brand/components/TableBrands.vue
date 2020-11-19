<template>
  <div class="brands-wapper">
    <div
      v-for="item in brands"
      :key="item"
      :class="['brand-item', activeBrand === item ? 'actived' : '']"
      @click="click(item)">{{item}}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'BrandTableBrands',
  props: {
    brands: {
      type: Array,
      default: () => []
    },
    activeBrand: {
      type: String,
      default: ''
    }
  },
  watch: {
    activeBrand: {
      immediate: true,
      handler: function (params) {
        this.SET_ACTIVE_BRAND(params)
      }
    }
  },
  methods: {
    ...mapMutations('brand', ['SET_ACTIVE_BRAND']),
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
  margin-bottom 3px
  padding  0 1px 1px
  cursor pointer
  font-size 14px
  text-align center
  color $color-second

.actived
  border-bottom 2px solid $base-blue
  color $base-blue
</style>
