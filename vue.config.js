// about node.js
// path 模块提供了一些实用工具,用于处理文件和目录的路径
// 实用以下方式访问
const path = require('path')
const { resolve } = require('path')

module.exports = {
  outputDir: 'distTmall',
  css: {
    loaderOptions: {
      // 这里的选项会传递给stylus-loader
      stylus: {
        // path.resolve() 方法会将路径或者路径片段的序列解析为绝对路径
        // Node.js中, __dirname 总是指向被执行文件的绝对路径
        import: path.resolve(__dirname, './src/theme/index.styl')
      }
    }
  },
  configureWebpack: (config) => {
    // 打包去掉console
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  },
  // 是一个函数，会接收一个基于webpack-chain的chainableConfig 实例。允许对内部webpack配置进行更细粒度的修改
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
