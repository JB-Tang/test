const {resolve, join} = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',  //入口
  output: {
    filename: 'bundle.js', //打包后的文件
    path: resolve(__dirname, './dist')  //打包后的结果目录名
  },  //打包后的文件相关设置
  module: {
    rules: [{
      test:/\.css$/,    //正则： 匹配所有的css文件
      use: [
        'style-loader', //将处理好的css通过style标签的形式添加到页面上
        'css-loader',   //将css转化成webpack能够识别的数据
      ]   //注意，每个load都有它的功能，webpack执行loader时从右向左，从下向上执行。
    }]
  },
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