<template>
  <div class="shop-tags-wapper">
    <el-tag
      v-for="shop in selectedShop"
      :key="shop.shopname + shop.shopid"
      size="medium"
      closable
      @close="handleClose(shop)">{{shop.shopname}}</el-tag>
    <el-select
      v-show="isAdding"
      v-model="value"
      placeholder="请搜索店铺关键字"
      popper-class="shop-popper"
      size="mini"
      value-key="shopid"
      ref="select"
      remote
      filterable
      :remote-method="remoteMethod"
      :loading="loading"
      @focus="handleFocus"
      @change="handleSelectShop">
      <el-option-group
        v-for="group in shopList"
        :key="group.groupName"
        :label="group.groupName">
        <el-option
          v-for="item in group.options"
          :key="item.shopid + item.shopname"
          :value="item">
          <span v-html="highlight(likeCondition, item.shopname)"></span>
        </el-option>
      </el-option-group>
    </el-select>
    <el-button
      v-show="isAdding"
      type="text"
      style="padding: 7px 15px"
      @click="isAdding = false">取消</el-button>
    <el-button
      v-show="!isAdding"
      class="el-button--dashed"
      style="padding: 7px 25px;"
      @click="handleAddShop">+ 添加店铺</el-button>
  </div>
</template>

<script>
import { highlight } from '@/utils/common.js'
import { getShopList } from '@/api/shop.js'
import { mapState } from 'vuex'
import bus from '@/bus'

export default {
  name: 'ShopTags',
  data () {
    return {
      isAdding: false,
      shopList: [],
      value: {},
      loading: false,
      selectedShop: [],
      likeCondition: ''
    }
  },
  watch: {
    currentTabPane: {
      handler: function (params) {
        this.value = {}
        this.likeCondition = ''
        this.shopList = []
        this.selectedShop = []
      }
    }
  },
  computed: {
    ...mapState('file', ['currentTabPane'])
  },
  methods: {
    highlight: highlight,
    handleClose (shop) {
      this.selectedShop.splice(this.selectedShop.indexOf(shop), 1)
      this.$emit('handleSelectShop', this.selectedShop)
      bus.$emit('fileChangeSelectedShop', this.selectedShop)
    },
    handleSelectShop (val) {
      this.selectedShop.push(val)
      this.$refs.select.blur()
      this.value = {}
      this.isAdding = false
      this.$emit('handleSelectShop', this.selectedShop)
      bus.$emit('fileChangeSelectedShop', this.selectedShop)
    },
    handleFocus () {
      this.remoteMethod(this.likeCondition)
    },
    handleAddShop () {
      this.isAdding = true
      this.$nextTick(() => {
        this.$refs.select.focus()
      })
    },
    async remoteMethod (query) {
      if (query) {
        this.likeCondition = query
        this.shopList = []
        this.loading = true
        const res = await getShopList({ likeCondition: query, shopList: this.selectedShop })
        this.loading = false
        if (res.code === 200) {
          this.shopList = [
            {
              groupName: '匹配店铺',
              options: res.result.shop1
            }, {
              groupName: '相关店铺',
              options: res.result.shop2
            }]
        }
      } else {
        this.shopList = []
      }
    }
  }
}
</script>

<style lang="stylus">
.shop-tags-wapper
  & > span
    margin-right 10px
    margin-bottom 5px
.shop-popper
  .el-select-dropdown__item
    height 28px
    line-height 28px

  .el-select-group__wrap:not(:last-of-type)::after
    display none
  .el-select-group__wrap:not(:last-of-type)
    padding-bottom 12px
</style>
