import PreviewFooterButton from '@/components/Preview/FooterButtons.vue'
import PreviewFormRegulator from '@/components/Preview/FormRegulator.vue'
import PreviewTable from '@/components/Preview/PreviewTable.vue'
import { previewExcel } from '@/api/download'

export default {
  components: {
    PreviewFooterButton,
    PreviewFormRegulator,
    PreviewTable
  },
  data () {
    return {
      regulatorForm: {},
      excelHeader: [],
      tableData: [],
      tableTotal: 0,
      emptyMes: '请选择配置项'
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    handleOnExcel () {
      console.info(this.form)
      this.closeDialog()
      this.$emit('handleExportExcel', this.form)
    },
    handleExcelHeader (regulator, excelHeader) {
      this.regulatorForm = regulator
      this.excelHeader = excelHeader
      this.handlePreview()
    },
    async handlePreview () {
      if (this.regulatorForm.agg === undefined || this.regulatorForm.agg === '0000') {
        this.emptyMes = '请至少选择一种品类聚合类型'
        this.tableData = []
        this.tableTotal = 0
        return
      }
      this.emptyMes = '计算中...'
      this.tableData = []
      this.tableTotal = 0
      const res = await previewExcel(Object.assign(this.form, this.regulatorForm))
      if (res.code === 200) {
        this.tableData = res.result
        this.tableTotal = res.total
      } else {
        this.tableData = []
        this.tableTotal = 0
        this.emptyMes = 'Excel预览数据请求失败'
      }
    }
  }
}
