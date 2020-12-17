<template>
  <div class="shop-tags-wapper">
    <el-tag
      v-for="(brand, index) in selectedBrand"
      :key="brand + index"
      size="medium"
      closable
      @close="handleClose(brand)">{{brand}}</el-tag>
    <el-select
      v-show="isAdding"
      v-model="value"
      placeholder="请搜索品牌关键字"
      popper-class="shop-popper"
      size="mini"
      ref="select"
      style="margin-bottom: 5px"
      remote
      filterable
      :remote-method="remoteMethod"
      :loading="loading"
      @focus="handleFocus"
      @change="handleSelectBrand">
       <el-option
          v-for="(item, index) in brandList"
          :key="item + index"
          :value="item">
          <span v-html="highlight(likeCondition, item)"></span>
        </el-option>
    </el-select>
    <el-button
      v-show="isAdding"
      type="text"
      style="padding: 7px 15px"
      @click="isAdding = false">取消</el-button>
    <el-button
      v-show="!isAdding"
      class="el-button--dashed"
      style="padding: 7px 25px; margin-bottom: 5px"
      @click="handleAddShop">+ 添加品牌</el-button>
    <el-divider></el-divider>
    <Tips />
    <el-table
      header-row-class-name="tableHeaderClass"
      cell-class-name="tableCellClass"
      empty-text="请添加品牌"
      ref="table"
      :data="tableData"
      style="min-height: 248px;">
      <el-table-column
        prop="brand"
        label="品牌"
        width="250">
      </el-table-column>
      <el-table-column
        width="300">
        <template #header>
          <Table-Header-Tooltip label="品牌关键字" content="品牌关键字"/>
        </template>
        <template slot-scope="{row, $index}">
          <Dynamic-Tags
            :value="row.keyword"
            :index="$index"
            k="keyword"
            @handlePushKeyWord="handlePushKeyWord"
            @handleCloseKeyWord="handleCloseKeyWord"/>
        </template>
      </el-table-column>
      <el-table-column
        width="300">
        <template #header>
          <Table-Header-Tooltip label="联名品牌关键字" content="联名品牌关键字"/>
        </template>
        <template slot-scope="{row, $index}">
          <Dynamic-Tags
            :value="row.inKeyword"
            :index="$index"
            k="inKeyword"
            @handlePushKeyWord="handlePushKeyWord"
            @handleCloseKeyWord="handleCloseKeyWord"/>
        </template>
      </el-table-column>
      <el-table-column
        width="300">
        <template #header>
          <Table-Header-Tooltip label="不包含关键字" content="不包含关键字"/>
        </template>
        <template slot-scope="{row, $index}">
          <Dynamic-Tags
            :value="row.exKeyword"
            :index="$index"
            k="exKeyword"
            @handlePushKeyWord="handlePushKeyWord"
            @handleCloseKeyWord="handleCloseKeyWord"/>
        </template>
      </el-table-column>
      <el-table-column width="20px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBrandByLikeCondition } from '@/api/brand'
import TableHeaderTooltip from '@/views/file/component/portrait/TableHeaderTooltip.vue'
import DynamicTags from '@/views/file/component/xiaohongshu/DynamicTags.vue'
import Tips from '@/views/file/component/xiaohongshu/tips.vue'
import { highlight } from '@/utils/common.js'
import { mapState } from 'vuex'

export default {
  name: 'ShopTags',
  components: { TableHeaderTooltip, DynamicTags, Tips },
  data () {
    return {
      isAdding: false,
      value: '',
      loading: false,
      selectedBrand: [],
      brandList: [],
      likeCondition: '',
      tableData: [],
      emptyPart: {
        keyword: [],
        inKeyword: [],
        exKeyword: []
      }
    }
  },
  watch: {
    currentTabPane: {
      handler: function (params) {
        this.value = ''
        this.likeCondition = ''
        this.selectedBrand = []
      }
    }
  },
  computed: {
    ...mapState('file', ['currentTabPane'])
  },
  methods: {
    highlight: highlight,
    handleClose (shop) {
      this.selectedBrand.splice(this.selectedBrand.indexOf(shop), 1)
    },
    handleSelectBrand (val) {
      this.selectedBrand.push(val)
      this.$refs.select.blur()
      this.value = ''
      this.isAdding = false
      this.tableData.unshift(Object.assign({ brand: val }, this.emptyPart))
      this.$emit('handleSelectBrand', this.tableData)
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
    handlePushKeyWord (index, key, value) {
      this.tableData[index][key].push(value)
    },
    handleCloseKeyWord (index, key, i) {
      this.tableData[index][key].splice(i, 1)
    },
    async remoteMethod (query) {
      if (query) {
        this.likeCondition = query
        this.loading = true
        const res = await getBrandByLikeCondition({ likeCondition: '花' })
        this.loading = false
        if (res.code === 200) {
          this.brandList = res.result
        }
      } else {
        this.brandList = []
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
