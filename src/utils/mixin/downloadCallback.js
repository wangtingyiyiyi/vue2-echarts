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
      console.info('audsfhaufhuash')
      if (xhr.readyState === 4 && xhr.status !== 200) {
        this.$message.error('文件下载失败')
        this.showDownloadBtn = false
      }
    }
  }
}
