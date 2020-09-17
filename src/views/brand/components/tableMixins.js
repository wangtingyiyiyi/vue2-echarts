import { refLoading } from '@/utils/element.js'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    sortItemVal: {
      type: String,
      default: '1'
    },
    isLoading: {
      type: Boolean,
      default: false
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
        } else {
          if (this.loadingInstance) {
            this.loadingInstance.close()
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
