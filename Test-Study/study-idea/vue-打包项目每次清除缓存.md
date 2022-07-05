# vue中每次打包之后清空缓存
## 简介
1. 在vue项目中，每次打包部署之后，在浏览器中都需要清空缓存才能看到最新的修改，这样对于用户体验很不好，以下是相关解决方案。
## 解决方法
1. 修改根目录index.html
  * 原理
    * 在html的head中添加不缓存的设置
  * 关键代码
    * head中的代码
      ```html
      <meta http-equiv="pragram" content="no-cache">
      <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
      ```
2. 配置nginx不缓存html
  * 原理
    * vue默认配置，打包后的css和js的名字后面都加了哈希值，不会有缓存问题。但是index.html在服务器端可能是有缓存的，所以需要在服务器配置不缓存index.html
  * 关键代码
    * nginx中配置
      ```javascript
      server {
        listen 80;
        server_name yourdomain.com;
        location / {
            try_files $uri $uri/ /index.html;
            root /yourdir/;
            index index.html index.htm;

            if ($request_filename ~* .*\.(?:htm|html)$)
            {
                add_header Cache-Control "no-cache, no-store";  //对html文件设置永远不缓存
            }  
          }
        }
      ```
    * 注：
      * no-cache：浏览器会缓存，但刷新页面或者重新打开时会请求服务器，服务器可以响应304（服务端已经执行了GET，但文件未变化），如果文件有改动就响应200
      * no-store：浏览器不缓存，刷新页面需要重新下载页面
3. 打包的文件路径添加时间戳
  * vue-cli2项目中
    * 找到build/webpack.prod.conf.js文件
      ```javascript
      //定义一个变量获取当前时间戳
      const version = new Date().getTime()
      //output模块将时间戳加入到输出的文件名里
      output: {
        publicPath: '/',
        path: config.build.assetsRoot,
        filename: utils.assetsPath(`js/[name].[chunkhash].${version}.js`),
        chunkFilename: utils.assetsPath(`js/[id].[chunkhash].${version}.js`)
      },
      //css文件名加时间戳
      new ExtractTextPlugin({
          filename: utils.assetsPath(`css/[name].[contenthash].${version}.css`),
          allChunks: true,
      })
      ```
    * vue-cli3项目中
      * 打开vue.config.js文件
        ```javascript
        const version = new Date().getTime()
        module.exports = {
          outputDir: 'dist', //打包的时候生成的一个文件名
          lintOnSave: false,
            productionSourceMap: false,
            css: {
              loaderOptions: {
                sass: {
                  data: `@import "@/components/themes/_handle.scss";`
                }
              },
              // 是否使用css分离插件 ExtractTextPlugin
              extract: {
                // 修改打包后css文件名   // css打包文件，添加时间戳
                filename: `css/[name].${version}.css`,   
                chunkFilename: `css/[name].${version}.css`
              }
            },
            configureWebpack: {
            output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
              filename: `js/[name].[chunkhash].${version}.js`,
              chunkFilename: `js/[id].[chunkhash].${version}.js`
            }
          }
        }
        ```
4. 使用location.reload()重新加载当前文档
  * 如果使用第一种方式，在index.html设置不允许缓存，每次刷新时，就会重新加载资源，造成响应过慢的现象，所以，针对这个缺点，这里引入一个新的方案
  * 步骤
    * 在package.json文件中，每次打包时，修改一下里面的version属性
    * 在main.js文件中，添加关于version的判断
  * 关键代码
    * main.js中关于version的判断与操作
      ```javascript
      const VUE_APP_VERSION = require('../package.json').version
      const version = localStorage.getItem('appVersion')
      if (VUE_APP_VERSION !== version) {
        localStorage.clear()
        localStorage.setItem('appVersion', VUE_APP_VERSION)
        location.reload()
      }
      ```
## 参考网址
1. [vue部署上线清除浏览器缓存](https://blog.csdn.net/atu1111/article/details/121342180?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0-121342180-blog-125541825.pc_relevant_aa&spm=1001.2101.3001.4242.1&utm_relevant_index=2)