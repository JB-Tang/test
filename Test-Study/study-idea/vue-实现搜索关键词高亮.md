# 实现搜索关键词高亮
## 简介
## 实现方法
1. 方法一
2. 方法二
  * 原理
    * 使用正则表达式替换整个字符串中的关键字为带有class样式的标签
    * 为class添加相关的样式
  * 关键代码
    * js
      ```javascript
      function lightKeyword(baseStr, keyword) {
        return baseStr.replace(new RegExp(keyword, 'ig'), $1 => `<span class="light">${$1}</span>`)
      }
      ```
    * css
      ```css
      .light{
        color: #ff6e6e;
      }
      ```
  * 代码示例
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>测试一下将关键字代码高亮</title>
    </head>
    <style>
      .light{
        color: #ff6e6e;
      }
    </style>
    <body>
      <div id="textShow"></div>
    </body>
    <script>
      window.onload = function(){
        let testText = '本身就扩大v不仅可使场v城市打工火车VS的v和是v把司机电话v就看撒从VS大大v不插手大家度就会都机'
        document.querySelector('#textShow').innerHTML = lightKeyword(testText, '大')
      }
      function lightKeyword(baseStr, keyword) {
        return baseStr.replace(new RegExp(keyword, 'ig'), $1 => `<span class="light">${$1}</span>`)
      }
    </script>
    </html>
    ```
## 参考网址
1. [vue实现搜索关键词高亮（保姆级教程）](https://juejin.cn/post/7114311817223995428)