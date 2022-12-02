# less学习
## 环境搭建
1. 直接在页面中引入```Less.js```
    * 在官网下载
    * 使用CDN
      ```html
      <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>
      ```
    * 注意点
      * link标签一定要在Less.js之前引入，并且link标签的rel属性要设置为```stylesheet/less```
          ```html
          <link rel="stylesheet/less" href="style.less">
          <script src="less.min.js"></script>
          ```
2. 使用npm安装
    * 注意点
      * 如果是webpack使用者，在配置里面要添加```less-loader```进行处理
## 具体使用
1. 变量
    * 值变量
        * 
    * 选择器变量
    * 属性变量
    * url变量
    * 声明变量
    * 变量运算
    * 变量作用域
    * 用变量去定义变量
2. 嵌套
    * &的妙用
    * 媒体查询
3. 混合方法
    * 无参数方法
    * 默认参数方法
    * 方法的匹配模式
    * 方法的命名空间
    * 方法的条件筛选
    * 数量不定的参数
    * 方法使用important
    * 循环方法
    * 属性拼接方法
4. 继承
    * extend关键字的使用
    * all全局搜索替换
5. 导入
    * 基本使用
    * reference
    * once
    * multiple
6. 内置函数
    * 判断类型
      * ```isnumber```：判断给定的值，是否是一个数字
      * ```iscolor```：判断给定的值，是否是一个颜色
      * ```isurl```：判断给定的值，是否是一个url
      * 代码示例
        ```less
        isnumber(1234);
        iscolor(#fff);
        isurl(url(...));
        ```
    * 颜色操作
      * ```saturate```：增加一定数值的颜色饱和度
      * ```lighten```：增加一定数值的颜色亮度
      * ```darken```：降低一定数值的颜色亮度
      * ```fade```：给颜色设定一定数值的透明度
      * ```mix```：根据比例混合两种颜色
    * 数学函数
      * ```ceil```：向上取整
      * ```floor```：向下取整
      * ```percentage```：将浮点数转换为百分比字符串
      * ```round```：四舍五入
      * ```sqrt```：计算一个数的平方根
      * ```abs```：计算数字的绝对值，原样保持单位
      * ```pow```：计算一个数的乘方
7. 其他
    * 注释
      * 
    * 避免编译
    * 变量拼串
    * 使用JS
    

## 参考网址
1. [学习Less-看这篇就够了](https://juejin.cn/post/6844903520441729037)