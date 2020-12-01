<template>
  <div>
    <Title class="m-b-12" title="提取店铺"/>
    <Shop-Tags />
    <el-divider></el-divider>
    <Type-Buttons
      class="m-b-24"
      :activedType="currentPartComponent"
      @handleChangeActiveType="currentPartComponent = $event"/>
    <component v-bind:is="currentPartComponent"></component>
    <Preview-Table-Title />
  </div>
</template>

<script>
import ShopTags from '@/views/file/component/portrait/ShopTags.vue'
import TypeButtons from '@/views/file/component/portrait/TypeButtons.vue'
import PartIcon from '@/views/file/component/portrait/PartIcon.vue'
import PartMau from '@/views/file/component/portrait/PartMau.vue'
import PartPhone from '@/views/file/component/portrait/PartPhone.vue'
import PreviewTableTitle from '@/views/file/component/PreviewTableTitle.vue'

export default {
  name: 'TabForPortrait',
  components: { TypeButtons, PreviewTableTitle, ShopTags, PartIcon, PartMau, PartPhone },
  data () {
    return {
      currentPartComponent: 'PartIcon'
    }
  }
}
</script>
