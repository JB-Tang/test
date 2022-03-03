# Vue学习
## 2022-02-01
1. v-bind,v-model
    
2. el和data的两种写法
3. data数据代理
4. methods事件处理
5. computed计算属性
6. watch监听属性
7. 
## 2022-02-27
1. 绑定样式
    * 绑定class样式
        * 字符串写法
            * 适用于：类名不确定，要动态获取
        * 对象写法
            * 适用于：要绑定的样式个数确定，名称也确定，但要动态决定用不用
        * 数组写法
            * 适用于：要绑定的样式个数不确定，名字也不确定
        * 代码示例
            ```html
                <div class="basic" :class="testStr"></div>

                <div class="basic" :class="testArr"></div>
                <div class="basic" :class="['class1','class2']"></div>
                <div class="basic" :class="[true?'classtrue':'classfalse','class2']"></div>

                <div class="basic" :class="testObj"></div>
                <div class="basic" :class="{class1:false,class2:false}"></div>
                <script>
                    const vm=new Vue({
                        el:'',
                        data:{
                            testStr:'class',
                            testArr:['class1','class2'],
                            testObj:{
                                class1:false,
                                class2:false
                                }
                        }
                    })
                </script>
            ```
    * 绑定style样式
        * 样式对象：css中的key编程驼峰命名法，例如font-size变成fontSize。
        * 常用对象表示:style="testObj"
        * 代码示例
            ```html
                <div :style="testObj"></div>
                <div :style="{fontSize:fsize+'px'}"></div>

                <div :style="testArr"></div>

                <script>
                    const vm=new Vue({
                        el:'',
                        data:{
                            fsize:40,
                            testObj:{
                                fontSize:'40px',
                                backgroundColor:'red'
                            },
                            testArr:[{
                                fontSize:'40px',
                                backgroundColor:'red'
                            },{
                                color:'yellow'
                            }]
                        }
                    })
                </script>
            ```
2. 条件渲染
    * v-show
        * 节点在文档中仍然在，相当于使用display:none;
    * v-if
        * 节点在文档中直接不存在，结构中直接没有，相当于没有定义这个节点。
        * v-else-if,v-else：
            * 相比较都是v-if而言，v-if,v-else-if,v-else是一组，只要第一个判断符合，就不会执行下面的语句了。
            * 而如果都是v-if，则每个v-if都会判断。
            * 注意：v-if,v-else-if,v-else语句需要连在一起使用，中间不能使用其他元素打断。
    * 如果不想添加一个新的元素，但是想要某个区域同时使用v-if,可以使用template,注意，不能使用v-show。
        * 代码示例
            ```html
                <template v-if="true">
                    <div>1</div>
                    <div>2</div>
                </template>
            ```
    * 如果一个元素变化频率高，建议使用v-show
    * 使用v-if时，元素可能无法获取到，而使用v-show，元素一定可以获取到
3. 列表渲染
    * v-for
        * 写法：v-for="site in arr"，v-for="(site,index) in arr" :key="yyy"
        * 除了in之外，也可以使用of，最好还是用in
        * 遍历内容
            * 数组：
                * site：数组中的元素
                * index：数组的索引
            * 对象：
                * site：对象的值
                * index：对象的key
            * 字符串：
                * site：字符
                * index：字符的在字符串中的下标索引
            * 数字：（遍历指定次数）
                * site：从1开始的数字
                * index：从0开始的索引
        * 代码示例
            ```html
                <div v-for="(site,index) in testArr">
                    <span>姓名是:{{site.name}}</span>
                </div>
                <script>
                    const vm=new Vue({
                        el:'',
                        data:{
                            testArr:[
                                {id:'001',name:'张三',age:18},
                                {id:'002',name:'李四',age:19},
                                {id:'003',name:'王五',age:20},
                            ]
                        }
                    })
                </script>
            ```
    * key属性
        * 当不写key时，会默认将index作为key值。
        * 虚拟DOM中key的作用
            * key是虚拟DOM对象的标识，当状态中的数据发生变化时，Vue会根据新数据生成新的虚拟DOM，随后Vue会进行新虚拟DOM和旧虚拟DOM的差异比较，规格如下：
                * 旧虚拟DOM中找到了与新虚拟DOM相同的key:
                    * 若虚拟DOM中内容没有改变，直接使用之前的真实DOM
                    * 若虚拟DOM中内容变了，则生成新的真实DOM,随后替换掉页面中之前的真实DOM
                * 旧虚拟DOM中未找到与新虚拟DOM相同的key:
                    * 创建新的真实DOM，随后渲染到页面
        * 用index作为key可能会引发的问题
            * 若对数据进行：逆序添加，逆序删除等破坏顺序操作：会产生没有必要的真实DOM更新==>页面效果没问题，但是效率低。
            * 如果结构中还包含输入类的DOM：会产生错误DOM更新==>页面显示出问题。
        * 如何选择key
            * 最好使用每条数据的唯一标识作为key，比如id，手机号等唯一值。
            * 如果不存在对数组的逆序添加，逆序删除等破坏顺序操作，仅用于渲染列表用于展示，那么使用index作为key也是没有问题的。
        * 建议在使用v-for的时候，加上这个属性，因为不加的话，在Vue3中会报错。
    * 列表过滤
        * 使用数组的方法filter()来实现数组的过滤
        * 存在的问题，如果使用filter()修改原数组，会导致原数组越来越少，原数组失去原先的值。
        * 改进方法;
            * 方法一：使用watch
                * 在data中新增一个数组变量
                * 在watch中添加一个对关键字的监听，注意，添加immediate:true,将根据原始数组过滤后的数组给data中的新数组。
                * 模板中使用data中的新数组
                * 原理：watch的immediate属性表示立即执行watch中的handler，这样可以确保页面中一开始就会显示列表。
            * 方法二：使用computed
                * 在计算属性中新增一个变量，返回一个根据关键字筛选的新数组。
                * 模板中使用计算属性中新增的变量循环。
                * 原理：计算属性会根据它使用的变量的改变而改变。
    * 列表排序
        * 使用数组的sort()的方法来实现数组的排序
        * 在上面的过滤的计算属性中新数组：return前，过滤后排序。
        * watch属性也可以写，但是不建议，因为需要对data中新变脸添加监听。
4. vue监测数据的原理
    * 本质是数据代理
    * 相关代码解析步骤
        ```javascript
            //监听对象
            function Observer(obj){
                //汇总对象中所有属性形成的一个数组
                const keys=Object.keys(obj);
                //遍历
                keys.forEach(k=>{
                    Object.defineProperty(this,k,{
                        get(){
                            return obj[k]
                        },
                        set(val){
                            obj[k]=val
                        }
                    })
                })
            }

            let data={
                name:'hhh',
                address:'hkdfsjh'
            }
            let vm={};
            //创建一个监视的实例对象，用于监视data中属性的变化
            vm._data=new Observer(data)

        ```
    * Vue.set的使用
        * 初始的时候没有写的属性，可以后期添加响应式的属性
        * Vue.set(target,key,value)
        * 实例对象上的set方法：vm.$set(target,key,value)
        * 局限：只能给data中的某个对象上添加新属性，及target不能是vm，也不能是vm_data。
    * 总结
        * Vue会监视data中所有层次的数据
        * 如何监测对象中的数据：
            * 通过setter实现监视，且要在new Vue时就传入要监测的数据。
                * 对象后追加的属性，Vue默认不做响应式处理
                * 如需给后添加的属性做响应式，可使用如下API:
                    * Vue.set(target,propertyName/index,value)
                    * vm.$set(target,propertyName/index,value)
                * 注意：使用set时，只能给data中的某个对象上添加新属性，Vue实例和根数据不可以作为target。
        * 如何监听数组中的数据
            * 通过包裹数组更新元素的方法实现，本质就是做了两件事
                * 调用原生对应的方法对数组进行更新
                * 重新解析模板，进行页面更新
            * 方法包括：push,pop,shift,unshift,splice,sort,reverse
            * 在修改数组中的某个元素时，一定要用如下方法(数组没有使用setter实现监测):
                * 上述7个API
                * Vue.set()或vm.$set()
            * 对于非上述7个API的数组方法（filter,map），可以直接将操作之后的新数组直接替换旧数组。
        * 数据劫持
            * 将对象强行使用setter和getter生成新的对象的操作叫做数据劫持。
## 2022-02-28               
1. 收集表单元素
    * v-model默认收集的是value值，类似于v-bind:value
    * input
        * type="text"：v-model收集的是value值，用户输入的就是value值。
        * type="radio"：v-model收集的是value值，且要给标签配置value值。
        * type="checkbox"：
            * 没有配置value属性：那么收集的就是checked，即true或者false。
            * 配置value属性：
                * v-model的初始值是非数组，那么收集的就是checked
                * v-model的初始值是数组，那么收集的就是value组成的数组。
    * v-model的三个修饰符
        * lazy：失去焦点再收集数据
        * number：输入字符串转为有效数字
        * trim：输入首尾空格过滤
        * 代码示例
            ```html
                <input type="text" v-model.lazy="">
                <input type="text" v-model.number="">
                <input type="text" v-model.trim="">
            ```
2. 过滤器
    * 定义：对要显示的数据进行特定格式化后再显示（适用一些简单逻辑的处理）
    * 语法：
        * 注册过滤器：
            * 注册全局过滤器：Vue.filter(name,callback)
            * 注册局部过滤器：new Vue({filters:{}})
        * 使用过滤器
            * 直接在插值语句中使用：{{xxx | 过滤器名}}
            * 在属性中使用：v-bind:属性="xxx | 过滤器名"
    * 备注：
        * 过滤器也可以接收额外参数，但是在定义过滤器时需要将默认的value写在第一位。
        * 过滤器可以串联，前一个过滤的结果可以给下一个过滤器使用
        * 过滤器并没有改变原本的数据，是产生新的对应的数据
        * 有些时候过滤器也可以使用计算属性或者methods
    * 代码示例
        ```javascript
            const vm=new Vue({
                el:'',
                filters:{
                    //value就是过滤的值,args是传参组成的数组
                    addArr(value,...args){
                        return value
                    },
                },
            })
        ```
3. 其他指令
    * v-text
        * 作用：向其所在的节点中渲染文本内容
        * 与插值语法的区别：v-text会替换掉节点中的内容，插值语句{{xx}}不会
    * v-html
        * 作用：向指定节点中渲染包含html结构的内容
        * 与插值语法的区别
            * v-html会替换掉节点中所有的内容，{{xx}}不会
            * v-html会识别html结构
        * 注意点
            * 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击
                * 例如：不发分子使用a标签封装的js获取用户登录的cookie。
            * 一定要在可信的内容上使用v-html，永远不要用在用户提交的内容上。
    * v-cloak
        * 本质是一个特殊属性。Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
        * 使用CSS配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
    * v-once
        * v-once所在节点在初次动态渲染后，就视为静态内容了。
        * 以后数据的改变不会引起v-once所在结构的更新，可用于优化性能。
    * v-pre
        * 跳过其所在节点的编译过程
        * 可利用它跳过以下内容，加快编译
            * 没有使用指令语法
            * 没有使用插值语法的节点
## 2022-03-01
1. 自定义指令：directives
    * 定义语法：
        * 局部指令：
            * new Vue({directives:{指令名:配置对象}})
            * new Vue({directives:{指令名:回调函数}})
        * 全局指令：
            * Vue.directive(指令名,配置对象)
            * Vue.directive(指令名,回调函数)
    * 回调函数写法与配置对象写法区别
        * 回调函数何时会被调用
            * 指令与元素成功绑定时
            * 指令所在的模板被重新解析时
        * 配置对象常见的3个回调
            * bind：指令与元素成功绑定时调用
            * inserted：指令所在元素被插入页面时调用
            * update：指令所在模板结构被重新解析时调用
        * 总结：回调函数的写法相比较配置对象的写法，少了一个inserted的时间。
    * 注意点：
        * 指令在定义时不加v-，使用的时候加v-
        * 指令名中配置对象或者回调函数中的this指向的是window
        * 指令名如果是多个单词，要使用kebab-case命名方式（aaa-bbb-ccc），不要使用camelCase方式（aaaBbbCcc）
    * 代码示例
        ```javascript
            const vm=new Vue({
                el:'',
                directives:{
                    //回调函数写法
                    big(element,binding){
                        element.innerText=binding.value*10;
                    },
                    //配置对象写法
                    fbind:{
                        bind(element,binding){},
                        inserted(element,binding){},
                        update(element,binding){}
                    },
                    //kebab-case命名方式
                    'test-big'(element,binding){},
                    'test-number':{
                        bind(element,binding){},
                        inserted(element,binding){},
                        update(element,binding){}
                    }
                }
            })
        ```
2. 生命周期
    * vm的一生（create->mount->update->destroy）
        * 将要创建 ===> 调用beforeCreate函数
        * 创建完毕 ===> 调用created函数
        * 将要挂载 ===> 调用beforeMount函数
        * 挂载完毕(重要) ===> 调用mounted函数
        * 将要更新 ===> 调用beforeUpdate函数
        * 更新完毕 ===> 调用updated函数
        * 将要销毁(重要) ===> 调用beforeDestroy函数
        * 销毁完毕 ===> 调用destroyed函数
    * 几个重要阶段
        * create的前后是数据的初始化：数据监听和数据代理，所以beforeCreate生命周期中无法通过vm访问data中的数据以及methods中的方法
        * mount的前后是虚拟DOM转化为真实DOM，所以在beforeMount中对真实DOM的修改都不会生效，因为都会被下一步的虚拟DOM转化为真实DOM覆盖
    * 常用的生命周期钩子
        * mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等。主要在这个生命周期实现一些初始化操作
        * beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等。主要在这个生命周期完成收尾工作
    * 使用template属性的注意点
        * 使用template是直接替换el中元素里面的dom结构，包括会替换el的那个元素。
        * 使用template只能有一个根节点元素。
    * 关于销毁Vue实例
        * 销毁Vue实例后借助Vue开发者工具看不到任何信息
        * 销毁后自定义事件会失效，但是原生DOM事件依然有效
        * 一般不要在beforeDestroy操作数据，因为即使操作数据。也不会再出发更新流程了，即页面也不会正常显示了。
## 2022-03-03
1. 组件
    * 非单文件组件
        * vm.$children
    * 单文件组件



## 小知识
1. Vue中如果实例调用实例中对象没有的属性，undefined不会显示到页面上。
## 小技巧
1. alter可以对多行操作
## 实用网站
1. bootCDN
## 第三方库
1. moment.js
2. day.js
## 浏览器插件
1. Cookie Editor


