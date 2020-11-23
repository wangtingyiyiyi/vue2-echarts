import IndustrySelectTree from '@/views/industry/components/IndustrySelectTree.vue'
import GroupRadio from '@/views/file/component/GroupRadio.vue'
import GroupCheckbox from '@/views/file/component/GroupCheckbox.vue'
import PreviewTable from '@/views/file/component/PreviewTable.vue'

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
      INDUSTRY_EXCEL_TABLE_PROP
    }
  },
  components: {
    IndustrySelectTree,
    GroupRadio,
    GroupCheckbox,
    PreviewTable
  }
}
