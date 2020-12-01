<template>
<div class="shop-tags-wapper">
  <el-tag
    v-for="tag in tags"
    :key="tag.shopName"
    size="medium"
    closable>
    {{tag.shopName}}
  </el-tag>

  <el-select
    v-show="isAdding"
    v-model="value"
    placeholder="请选择"
    popper-class="shop-popper"
    size="mini"
    value-key="id"
    ref="select"
    @change="changeShop">
    <el-option-group
      v-for="group in options"
      :key="group.groupName"
      :label="group.groupName">
      <el-option
        v-for="item in group.options"
        :key="item.id"
        :label="item.shopName"
        :value="item">
      </el-option>
    </el-option-group>
  </el-select>
  <el-button
    v-show="isAdding"
    type="text"
    @click="isAdding = false">取消</el-button>
  <el-button
    v-show="!isAdding"
    class="el-button--dashed"
    style="padding: 7px 15px"
    @click="isAdding = true">+ 添加店铺</el-button>
</div>
</template>

<script>
export default {
  name: 'ShopTags',
  data () {
    return {
      isAdding: false,
      options: [{
        groupName: '匹配店铺',
        options: [{
          id: '001',
          shopName: '蒙牛001'
        }, {
          id: '002',
          shopName: '蒙牛002'
        }]
      }, {
        groupName: '相关店铺',
        options: [{
          id: '003',
          shopName: '苏宁易购'
        }, {
          id: '004',
          shopName: '考拉'
        }]
      }],
      value: {},
      tags: [
        { shopName: '蒙牛旗舰店', id: '1' },
        { shopName: '天猫超市', id: '2' },
        { shopName: '伊利旗舰店', id: '3' },
        { shopName: '蒙牛张三专营店', id: '4' },
        { shopName: '蒙牛张丹钱ds专营店', id: '5' },
        { shopName: '蒙牛张丹ds钱专营店', id: '6' }
      ]
    }
  },
  methods: {
    changeShop (val) {
      this.tags.push(val)
      this.$nextTick(() => {
        this.$refs.select.blur()
        this.value = {}
      })
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
