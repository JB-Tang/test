const {resolve, join} = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',  //入口
  output: {
    filename: 'bundle.js', //打包后的文件
    path: resolve(__dirname, './dist')  //打包后的结果目录名
  },  //打包后的文件相关设置
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      scriptLoading: 'blocking',  //默认是defer
    })
  ],  //配置插件
  devServer: {
    static: {
      directory: join(__dirname, './dist'), //dist目录作为服务器使用
    },
    compress: true, //压缩
    port: 9000, //端口号
    open: true, //打包完之后自动默认打开服务器
    watchFiles: ['./index.html'], //指定监听文件的路径
  },  //用于放置webpack-dev-server配置
  mode: 'development' //开发模式
}