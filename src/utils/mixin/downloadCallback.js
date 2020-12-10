// 文件下载的callBack函数
export default {
  methods: {
    onprogress (event) {
      if (event.total !== 0) {
        const p = event.loaded / event.total
        this.loadingProgress = p
        if (event.loaded === event.total) {
          this.$message.success('下载完成')
          this.showDownloadBtn = false
        }
      }
    },
    onreadystatechange (xhr, response) {
      if (xhr.readyState === 4 && xhr.status === 600) {
        const mes = this.judgeAction(response.target.responseURL)
        this.$message.error(`【${mes}】下载次数已超过最大配额。如有下载需求，请联系管理员。`)
        this.showDownloadBtn = false
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        this.$message.error('文件下载失败')
        this.showDownloadBtn = false
      }
    },
    judgeAction (url) {
      const action = url.split('=')[1]
      switch (action) {
        case 'brand':
          return '品牌提数'
        case 'industry':
          return '行业提数'
        case 'persona':
          return '人群画像'
        default:
          break
      }
    }
  }
}
