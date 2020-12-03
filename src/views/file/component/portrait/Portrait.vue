<template>
  <div>
    <Title class="m-b-12" title="提取店铺"/>
    <Shop-Tags @handleSelectShop="handleSelectShop"/>
    <el-divider></el-divider>
    <Type-Buttons
      class="m-b-24"
      :activedType="currentPartComponent"
      @handleChangeActiveType="handleChangeActiveType"/>
    <component
      v-bind:is="currentPartComponent"
      :shopList="shopList"
      @setPreveiwParam="setPreveiwParam"
      @setExcelHeader="setExcelHeader"></component>
    <Preview-Table-Title />
    <Preview-Table
      v-if="shopList.length !== 0"
      :tableTotal="tableTotal"
      :tableData="previewData"
      :excelHeader="headerObj[currentPartComponent]"/>
    <div class="text-second" v-show="shopList.length === 0">{{emptyMes}}</div>
  </div>
</template>

<script>
import ShopTags from '@/views/file/component/portrait/ShopTags.vue'
import TypeButtons from '@/views/file/component/portrait/TypeButtons.vue'
import Persona from '@/views/file/component/portrait/PartPersona.vue'
import Mau from '@/views/file/component/portrait/PartMau.vue'
import Phone from '@/views/file/component/portrait/PartPhone.vue'
import PreviewTableTitle from '@/views/file/component/PreviewTableTitle.vue'
import PreviewTable from '@/views/file/component/PreviewTable.vue'
import { getShopPreview } from '@/api/shop.js'
import { PHONE_EXCEL_HEADER, PERSONA_EXCEL_HEADER, MUA_EXCEL_HEADER } from '@/utils/const.js'

export default {
  name: 'TabForPortrait',
  components: { TypeButtons, PreviewTableTitle, ShopTags, Persona, Mau, Phone, PreviewTable },
  data () {
    return {
      currentPartComponent: 'Persona',
      shopList: [],
      previewData: [],
      tableTotal: 0,
      previewParam: {
        particle: 'half_year',
        range: 'all',
        uvAgg: ['shop'],
        personaAgg: [],
        type: ''
      },
      headerObj: {
        Phone: PHONE_EXCEL_HEADER,
        Persona: PERSONA_EXCEL_HEADER,
        Mau: MUA_EXCEL_HEADER
      },
      emptyMes: '请添加店铺'
    }
  },
  methods: {
    handleSelectShop (shopList) {
      this.shopList = shopList
      this.previewParam.type = this.currentPartComponent.toLowerCase()
      this.handlePreview()
    },
    setExcelHeader (arr) {
      this.headerObj[this.currentPartComponent] = arr
    },
    setPreveiwParam (param) {
      this.previewParam = param
      this.handlePreview()
    },
    handleChangeActiveType (activeTab) {
      this.currentPartComponent = activeTab
      this.previewParam.type = activeTab.toLowerCase()
      this.handlePreview()
    },
    async handlePreview () {
      console.info(this.previewParam)
      if (this.previewParam.type === 'persona' && this.previewParam.personaAgg.length === 0) {
        this.emptyMes = '请选择一种画像维度'
        return
      }
      const res = await getShopPreview(Object.assign(this.previewParam, { shopList: this.shopList }))
      if (res.code === 200) {
        this.previewData = res.result
        this.tableTotal = res.count
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.empty-wapper
  height 200px
  width 100%
  margin-top 50px
  display flex
</style>
