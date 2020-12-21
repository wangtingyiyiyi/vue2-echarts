<template>
  <div class="file-tab-wapper">
    <el-tabs v-model="activeTab" @tab-click="handleTabClick" lazy>
      <el-tab-pane
        v-for="item in tabs"
        :key="item.value"
        :label="item.label"
        :name="item.value">
        <component
          v-if="activeTab === item.value"
          :is="activeTab"
          :showDownloadBtn="showDownloadBtn"
          @exportExcel="handelOnExportExcel"></component>
      </el-tab-pane>
    </el-tabs>
    <Download-Button
      v-if="showDownloadBtn"
      :loadingProgress="loadingProgress"/>
  </div>
</template>

<script>
import Industry from '@/views/file/component/industry/Industry.vue'
import Brand from '@/views/file/component/brand/brand.vue'
import Portrait from '@/views/file/component/portrait/Portrait.vue'
import XiaoHongShu from '@/views/file/component/xiaohongshu/XiaoHongShu.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import { mapMutations } from 'vuex'
import { FILE_TABS } from '@/utils/const.js'
import { downloadFile } from '@/utils/common.js'
import downloadCallbackMixin from '@/utils/mixin/downloadCallback.js'

export default {
  name: 'File',
  components: { Industry, Brand, Portrait, XiaoHongShu, DownloadButton },
  mixins: [downloadCallbackMixin],
  data () {
    return {
      showDownloadBtn: false,
      activeTab: 'Industry',
      tabs: FILE_TABS,
      loadingProgress: 0
    }
  },
  methods: {
    ...mapMutations('file', ['FILE_CURRENT_TAB']),
    handleTabClick () {
      this.FILE_CURRENT_TAB(this.activeTab)
    },
    handelOnExportExcel (option) {
      Object.assign(option, { onprogress: this.onprogress, onreadystatechange: this.onreadystatechange })
      this.showDownloadBtn = true
      downloadFile(option)
    }
  }
}
</script>

<style lang="stylus" scoped>
.file-tab-wapper
  background-color #ffffff
  position relative
  min-height calc(100vh - 167px)

.file-tab-wapper >>> .el-tabs__item
    padding-left 25px !important
    font-size 16px
    line-height 56px
    height 56px
</style>
