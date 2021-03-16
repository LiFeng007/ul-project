/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-01-28 10:53:53
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-16 15:06:28
 */
const path = require("path")

const isProduction = process.env.NODE_ENV === 'production'


function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set('@assets', resolve('./src/assets'))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    if (isProduction) {

    // 给js和css配置版本
      config.output.filename('js/[name].[contenthash:7].js').end()
      config.output.chunkFilename('js/[name].[contenthash:7].js').end()
      config.plugin('extract-css-chunks-webpack-plugin').use(require('extract-css-chunks-webpack-plugin')).tap(args => [{
        filename: `css/[name].[contenthash:7].css`,
        chunkFilename: `css/[name].[contenthash:7].css`
      }]).end();
      // remove console 
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // 开启gzip压缩
      // config.plugin('compression-webpack-plugin').use(require('compression-webpack-plugin')).tap(args => [{
      //   algorithm: 'gzip',
      //   threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      //   test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
      //   minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      //   deleteOriginalAssets: true // 删除原文件
      // }]).end();
    }
  },
  configureWebpack: {
    // 分片打包时将包与包之间相互引入的code单独打包
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
  },
  pwa: {
    iconPaths: {
      favicon32     : 'favicon.ico',
      favicon16     : 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon      : 'favicon.ico',
      msTileImage   : 'favicon.ico'
   } 
  } , 
//   css: {
//     loaderOptions: {
//         postcss: {
//             plugins: [postcss]
//         }
//     },
// },
  productionSourceMap: false,//打包时不要map文件
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  lintOnSave: true,
}