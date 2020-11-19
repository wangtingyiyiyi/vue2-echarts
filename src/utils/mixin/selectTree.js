
export default {
  data () {

  },
  methods: {
    renderContent (h, { node, data, store }) {
      if (data.remark === '1' || data.remark === 1) {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5B8FF9;">{data.remark}</span>
            <span>{data.label}</span>
          </span>)
      } else if (data.remark === '2' || data.remark === 2) {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5AD8A6;">{data.remark}</span>
            <span>{data.label}</span>
          </span>)
      } else if (data.remark === '3' || data.remark === 3) {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5D7092;">{data.remark}</span>
            <span>{data.label}</span>
          </span>)
      } else if (data.remark === 0) {
        return (
          <span class="custom-tree-node">
            <span class="tree-select-icon" style="color: #5B8FF9;">自</span>
            <span>{data.label}</span>
          </span>)
      }
    }
  }
}
