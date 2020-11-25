import IndustrySelectTree from '@/views/industry/components/IndustrySelectTree.vue'
import GroupCheckbox from '@/views/file/component/GroupCheckbox.vue'
import PreviewTable from '@/views/file/component/PreviewTable.vue'
import PreviewTableTitle from '@/views/file/component/PreviewTableTitle.vue'
import GroupButtons from '@/views/file/component/GroupButtons.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import PreviewLoading from '@/views/file/component/PreviewLoading.vue'

import {
  RANGE_LEVEL,
  GROUP_LEVEL,
  CATEGORY_LEVEL,
  CATEGORT_GROUP,
  DATA_INDEX,
  INDUSTRY_EXCEL_TABLE_PROP
} from '@/utils/const.js'
export default {
  data () {
    return {
      GROUP_LEVEL,
      RANGE_LEVEL,
      CATEGORY_LEVEL,
      CATEGORT_GROUP,
      DATA_INDEX,
      INDUSTRY_EXCEL_TABLE_PROP,
      headerObj: {
        particle: ['月'],
        cateFlat: ['一级品类', '二级品类', '三级品类'],
        agg: [],
        indicator: ['销量', 'ASP', 'GMV']
      },
      props: {
        value: 'category',
        emitPath: false,
        checkStrictly: true,
        expandTrigger: 'hover'
      }
    }
  },
  components: {
    IndustrySelectTree,
    GroupCheckbox,
    PreviewTable,
    PreviewTableTitle,
    GroupButtons,
    DownloadButton,
    PreviewLoading
  }
}
