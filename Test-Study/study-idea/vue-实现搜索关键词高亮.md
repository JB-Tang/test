# 实现搜索关键词高亮
## 简介
## 实现方法
1. 方法一
  * 原理
    * 使用正则表达式中的exec方法，将字符串转换成一个特殊的字符串数组
    * 生成的字符串数组奇数是正常显示的字符串，偶数是需要高亮的字符串
    * 使用v-for渲染字符串数组
  * 关键代码
    * 将字符串转成特殊的字符串数组
      ```javascript
      function lightKeywordStrToArr (baseStr, keyword) {
        let reg = new RegExp(keyword, 'ig')
        let result = {}
        let currentIndex = 0
        let returnData = []
        while((result = reg.exec(baseStr))) {
          returnData.push(baseStr.slice(currentIndex, result.index))
          returnData.push(result[0])
          currentIndex = result.index + result[0].length
        }
        if(baseStr.length > currentIndex) {
          returnData.push(baseStr.slice(currentIndex, baseStr.length))
        }
        return returnData
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
        <script src="js/vue.js"></script>
        <title>测试vue中关键字高亮</title>
    </head>
    <style>
      .highLight{
        color: #ff6e6e;
      }
    </style>
    <body>
        <div id="root">
          <div>
            <span :class="index%2!==0?'highLight':''" v-for="(item,index) in textData" :key="index">{{item}}</span>
          </div>
        </div>
    </body>
    <script>
    const vm=new Vue({
      el:'#root',
      data:{
        textData: []
      },
      created () {
        console.log('111')
        let testText = '本身就扩大v不仅可S大大v不插手大家大数据和地方就是'
        this.textData = lightKeywordStrToArr(testText, '大')
      }
    })
    function lightKeywordStrToArr (baseStr, keyword) {
      let reg = new RegExp(keyword, 'ig')
      let result = {}
      let currentIndex = 0
      let returnData = []
      while((result = reg.exec(baseStr))) {
        returnData.push(baseStr.slice(currentIndex, result.index))
        returnData.push(result[0])
        currentIndex = result.index + result[0].length
      }
      if(baseStr.length > currentIndex) {
        returnData.push(baseStr.slice(currentIndex, baseStr.length))
      }
      return returnData
    }
    </script>
    </html>
    ```
2. 方法二
  * 原理
    * 使用正则表达式替换整个字符串中的关键字为带有class样式的标签
    * 为class添加相关的样式
  * 关键代码
    * 将字符串中关键字转成标签
      ```javascript
      function lightKeyword(baseStr, keyword) {
        return baseStr.replace(new RegExp(keyword, 'ig'), $1 => `<span class="light">${$1}</span>`)
      }
      ```
    * css中的样式
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