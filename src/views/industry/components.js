
import ChartForIndustry from '@/views/industry/components/ChartForIndustry.vue'
import ChartForBrand from '@/views/industry/components/ChartForBrand.vue'
import TableForIndustry from '@/views/industry/components/TableForIndustry.vue'
import TableForBrand from '@/views/industry/components/TableForBrand.vue'
import IndustrySetting from '@/views/industry/components/Setting.vue'
import Drawer from '@/components/Drawer.vue'
import DrawerContent from '@/views/industry/components/DrawerContent.vue'
import DrawerButton from '@/views/industry/components/DrawerButton.vue'
import DownloadButton from '@/components/DownloadButton.vue'
export default {
  components: {
    IndustrySetting,
    Drawer,
    DrawerContent,
    DrawerButton,
    TableForBrand,
    TableForIndustry,
    ChartForIndustry,
    ChartForBrand,
    DownloadButton
  }
}
