/**
 * 立即执行函数
 * (function(){}())或(function(){})()
 * 函数声明和函数表达式
 * 函数表达式后面可以直接加括号立即调用函数，函数声明不可以
 * 当js引擎检测到function关键字开头时，会认为这是个函数声明。
 * 所以，需要在function前面添加符号，来使js引擎认为这个是函数表达式。
 * 因此，常见的立即执行函数通常为(function(){}())或(function(){})()
 */

 //例如
 (function fn(test){
     console.log(test)
 }('111'))
 //此外，除了()运算符外，!,+,-,=等运算符都能起到立即执行的作用
 !function fn(test){
     console.log(test)
 }('111')
 
 -function fn(test){
     console.log(test)
 }('111')

 +function fn(test){
     console.log(test)
 }('111')

//使用立即执行函数的好处
//通过定义一个匿名函数，创建一个新的作用域，相当于创建一个私有的命名空间，该命名空间的方法，不会污染全局变量


//注意：立即执行函数不能被单独调用
