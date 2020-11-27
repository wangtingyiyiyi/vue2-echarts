
import { refLoading } from '@/utils/element.js'

export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    activedSortKey: {
      type: String,
      default: 'gmv'
    }
  },
  data () {
    return {
      loadingInstance: null,
      emptyText: ''
    }
  },
  computed: {
    tableBody () {
      return this.$refs.table.$refs.bodyWrapper
    }
  },
  watch: {
    isLoading: {
      immediate: true,
      handler: function (isLoading) {
        if (isLoading) {
          this.loadingInstance = refLoading(this.tableBody)
          this.emptyText = ''
        } else {
          if (this.loadingInstance) {
            this.loadingInstance.close()
            this.tableData.length === 0 ? this.emptyText = '暂无数据' : this.emptyText = ''
          }
        }
      }
    }
  },
  methods: {
    handleSort (sortVal) {
      this.$emit('changeSortItemVal', sortVal)
    }
  }
}
