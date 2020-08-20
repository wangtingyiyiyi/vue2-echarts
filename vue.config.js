const path = require('path')
const { resolve } = require('path')

module.exports = {
  outputDir: 'distTmall',
  css: {
    loaderOptions: {
      stylus: {
        import: path.resolve(__dirname, './src/theme/index.styl')
      }
    }
  },
  configureWebpack: (config) => {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  },
  chainWebpack (config) {
    // set svg-sprite-loadere
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
    // 使用 webpack-bundle-analyzer 帮助分析打包文件
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
