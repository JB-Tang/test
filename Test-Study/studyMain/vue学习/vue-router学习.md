# vue-router学习
## 使用介绍
1. 基本使用
    * html中
      * router-link
        * 类似于a标签，但是使用router-link创建的链接，可以在不重新加载页面的情况下更改URL
      * router-view
        * 显示与url对应的组件，可以放在任何地方以适应布局
      * 代码实例
        ```html
        <div id="app">
          <h1>Hello App!</h1>
          <p>
            <!-- 使用router-link组件进行导航 -->
            <router-link to="/">Go to Home</router-link>
            <router-link to="/about">Go to About</router-link>
          </p>
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </div>
        ```
    * js中
      * 实现步骤
        * 创建router实例
        * 挂载根实例
      * 代码示例
        * router.js
          ```javascript
          import { createRouter, createWebHashHistory } from 'vue-router'

          const router = createRouter({
            history: createWebHashHistory(), //history模式，这里使用 hash 模式
            routes: [
              {
                path: '/',
                redirect: '/login'
              },
              {
                path: '/login',
                component: () => import('@/views/frame/LoginView.vue')
              }
          })
          export default router
          ```
        * main.js
          ```javascript
          import { createApp } from 'vue'
          import App from './App.vue'
          import router from '@/router'
          const app = createApp(App)
          app.use(router)
          app.mount('#app')
          ```
2. 路由命名
    * 路由配置中除了path之外，还有一个属性name
    * 优点
      * 没有硬编码的URL
      * ```params```的自动编码/解码
      * 防止在url中打字错误
      * 绕过路径排序（只显示一个）
    * 实例
      * router配置
        ```javascript
        const routes = [
          {
            path: '/user',
            name: 'user',
            component: UserView
          }
        ]
        ```
      * 跳转方式
        * router-link
          ```html
          <router-link :to="{name: 'user'}"></router-link>
          ```
        * js中
          ```javascript
          router.push({name: 'user'})
          ```
3. 嵌套路由
    * 基础代码
      * 在对应的组件中，需要使用router-view来显示子组件
      * 在js中使用children配置子路由
    * 注意点
      * 以 / 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的URL
      * 利用上述注意点原理，子组件路由路径如果是空，类似于直接以 / 开头
      * 对于上述子组件路径直接为空的情况，可使用name属性去只导航到命名路由而不导航到嵌套路由
    * 实例
      * 父组件(UserView)中
        ```html
        <div>
          <router-view></router-view>
        </div>
        ```
      * 路由配置中
        ```javascript
        const router = createRouter({
          history: createWebHashHistory(), //history模式，这里使用 hash 模式
          routes: [
            // 基本用法
            {
              path: '/user',
              component: UserView,
              children: [
                {
                  // UserProfile将被渲染到UserView的<router-view>内部
                  path: 'profile',
                  component: UserProfile
                },
                {
                  path: 'posts',
                  component: UserPosts
                }
              ]
            },
            // 子组件路径为空
            {
              path: '/user',
              component: UserView,
              children: [
                {
                  // 此时url为/user的网页将直接显示UserProfile的页面
                  path: '',
                  component: UserProfile
                },
                {
                  path: 'posts',
                  component: UserPosts
                }
              ]
            },
            // 只导航到命名路由而不导航到嵌套路由
            // 跳转时直接使用name的跳转方式，可以只导航到user-parent路由，而不导航到嵌套路由
            // 注意：重新加载页面时会展示嵌套的子路由
            {
              path: '/user',
              name: 'user-parent',
              component: UserView,
              children: [{path: '', name: 'user-child1', component: UserProfile}]
            }
        })
        ```
4. 编程式导航
    * 除了使用```<router-link>```创建a标签来定义导航链接，我们还可以借助router的实例方法，通过编写代码来实现
    * 使用方法
      * 导航到不同位置
        * 声明式：```<router-link :to="...">```
        * 编程式：```router.push(...)```
      * 替换当前位置
        * 声明式：```<router-link :to="..." replace>```
        * 编程式：```router.replace(...)```或者```router.push({path: ..., replace: true})```
      * 横跨历史
        * 编程式：```router.go(...)```
    * 实例
      * html（声明式）
        ```html
        <router-link :to="/user"></router-link>
        <router-link :to="/user" replace></router-link>
        ```
      * js（编程式）
        ```javascript
        router.push('/user')
        router.push({path: '/user'})
        router.push({name: 'user'})
        router.push({path: '/user/eduardo'})
        router.push({name: 'user', params: {username: 'eduardo'}})
        router.push({name: 'user', query: {username: 'eduardo'}})
        router.push({path: '/user', hash: '#team'})
        router.push({path: '/user', replace: true})

        router.replace({ path: '/home' })

        router.forward()

        router.back()

        router.go(1)  // 向前移动一条记录，与 router.forward() 相同
        router.go(-1) // 返回一条记录，与 router.back() 相同
        router.go(3)  // 前进 3 条记录
        router.go(-100) // 向前移动100条记录如果没有那么多记录，静默失败
        ```
5. 路由传参
    * 路由通过url传参的两种方式params和query
    * params传参方式
      * 在路由配置中需要使用占位符声明接收params参数
      * 案例
        * js配置中
          ```javascript
          const routes = [
            {
              path: '/user/:id',  // 此处使用占位符
              component: UserView
            }
          ]
          ```
        * url: ```http:xxxx/#/user/afdg62387654```
        * 组件中接收
          ```javascript
          let {id} = route.params     // id: afdg62387654
          ```
    * query传参方式
      * url传参需要使用?xxxx=xx&xxxx=xx这种形式
      * 案例
        * url: ```http:xxxx/#/user?id=afdg62387654```
        * 组件中接收
          ```javascript
          let {id} = route.query      // id: afdg62387654
          ```
## 路由守卫
1. 路由守卫类型
    * 全局路由守卫
      * beforeEach
        * 当一个导航触发时，全局前置守卫按照创建顺序调用，守卫是异步解析执行，此时导航在所有守卫resolve完之前一直处于等待中
        * 守卫方法的参数
          * to：即将要进入的目标```用一种标准化的方式```
          * from：当前导航正要离开的路由```用一种标准化的方式```
          * next：可选，但是要确保在给定导航守卫的所有逻辑路径中只执行一次
        * 守卫方法的返回值
          * false：取消当前的导航，如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
          * 一个路由地址：通过一个路由地址跳转到一个不同的地址，就像你调用 router.push() 一样，你可以设置诸如 replace: true 或 name: 'home' 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 from 一样
        * 实例
          ```javascript
          // 基本使用
          router.beforeEach(async (to, from) => {
            if (true) {
              return { name: 'Login' }
            } else {
              return false
            }
          })
          // next的使用
          router.beforeEach(async (to, from, next) => {
            if (true) {
              next({ name: 'Login' }) 
            } else {
              next()
            }
          })
          ```
      * afterEach
        * 可注册全局后置钩子，与守卫不同的是，这些钩子不会接收next函数也不会改变导航本身
        * 对于分析、改变页面标题声明页面等辅助功能很有用
        * 实例
          ```javascript
          // 正常使用
          router.afterEach((to, from) => {

          })
          // 第三个错误failure
          router.afterEach((to, from, failure) => {
            
          })
          ```
      * beforeResolve
        * 每次导航时都会触发，但是确保在导航被确认前，同时在所有组件内守卫和异步路由组件被解析之后
        * ```router.beforeResolve```是获取数据或执行任何其他操作（如果用户无法进入页面时，你希望避免执行的操作）的理想位置
        * 实例
          ```javascript
          router.beforeResolve(async to => {
            if (to.meta.requiresCamera) {
              try {
                await askForCameraPermission()
              } catch (error) {
                if (error instanceof NotAllowedError) {
                  // 处理错误，然后取消导航
                  return false
                } else {
                  // 意料之外的错误，取消导航并把错误传给全局处理器
                  throw error
                }
              }
            }
          })
          ```
    * 路由的守卫
      * beforeRouteEnter
        * 在渲染该组件的对应路由被验证前调用
        * 不能获取组件实例this，因为当守卫执行时，组件实例还没有创建
        * 实例
          ```javascript
          // 正常使用
          beforeRouteEnter(to, from) {

          }
          // 想要使用组件实例
          beforeRouteEnter(to, from, next) {
            next(vm => {
              // 通过vm访问组件实例
            })
          }
          ```
      * beforeRouteUpdate
        * 在当前路由改变，但是该组件被复用时调用，例如：对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        * 在这种情况下，组件已经挂载好了，所以导航组件可以访问组件实例this
        * 实例
          ```javascript
          beforeRouteUpdate(to, from) {

          }
          ```
      * beforeRouteLeave
        * 在导航离开渲染该组件的对应路由时调用
        * 这种情况下也可以访问组件实例this
        * 实例
          ```javascript
          beforeRouteLeave(to, from) {

          }
          ```
      * 注意点
        * 可以在组件内直接定义路由导航守卫
        * 相当于页面中的另外的```生命周期函数```
    * 路由独享守卫
      * beforeEnter
        * 直接在路由配置上定义beforeEnter守卫
        * beforeEnter守卫只在进入路由时触发，不会在params,query或hash改变时触发
        * 可以将一个函数数组传递给beforeEnter,为不同的路由重用守卫
        * 实例
          ```javascript
          // 常规用法
          const routes = [{
            path: '/users/:id',
            components: UserDetails,
            beforeEnter: (to, from) => {

            }
          }]
          // 函数数组用法
          function func1(to) {

          }
          function func2(to) {

          }
          const routes = [{
            path: '/users/:id',
            components: UserDetails,
            beforeEnter: [func1, func2]
          }]
          ```
2. 路由守卫执行顺序
    * 1). 导航被触发
    * 2). 在失活的组件里调用```beforeRouteLeave```守卫
    * 3). 调用全局的```beforeEach```守卫
    * 4). 在重用的组件里调用```beforeRouteUpdate```守卫
    * 5). 在路由配置里调用```beforeEnter```
    * 6). 解析异步路由组件
    * 7). 在被激活的组件里调用```beforeRouteEnter```
    * 8). 调用全局的```beforeResolve```守卫
    * 9). 导航被确认
    * 10). 调用全局的```afterEach```
    * 11). 触发DOM更新
    * 12). 调用```beforeRouteEnter```守卫中传给```next```的回调函数，创建的组件实例会作为回调函数的参数传入
3. 注意点
    * 在3.x版本中,beforeEach,befoteEnter中的next是必写的，否则会出现无法跳转的情况
## 其他
1. 历史模式
    * Hash模式
      * hash模式是使用```createWebHashHistory()```创建的
      * 在内部传递的实际URL之前使用了一个哈希字符（#）
      * 由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理
      * 在SEO中有不好的影响
      * ```复制网址，刷新网址都可以正常使用```
    * HTML5模式
      * HTML5模式是使用```createWebHistory()```创建的（官方推荐使用这个模式，但是个人喜欢Hash模式）
      * 使用HTML5模式会使URL看起来比较正常，但是如果没有服务器配置，```刷新和复制网址都会出现错误```
      * 可以在服务器上添加一个简单的回退路由，可参考[官网](https://router.vuejs.org/zh/guide/essentials/history-mode.html#html5-%E6%A8%A1%E5%BC%8F)
2. 路由元信息（meta）
    * 有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的meta属性来实现，并且它可以在路由地址和导航守卫上都被访问到
    * 实例
      ```javascript
      // 配置
      const routes = [{
        path: '/login',
        component: LoginView,
        meta: {pageName: '登录页面'}
      }]
      // 路由守卫中使用
      router.beforeEach((to, from) => {
        console.log(to.meta.pageName)
      })
      // route中使用
      const route = useRoute()
      console.log(route.meta.pageName)
      ```
3. 路由缓存
    * 使用```keep-alive```包裹```router-view```
    * 实例
      ```html
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      ```
4. 路由组件传参（props）
    * 在路由配置时设置props参数，可以使组件中接收的url参数直接在props中使用
## 参考网址
1. [Vue Router官网](https://router.vuejs.org/zh/)