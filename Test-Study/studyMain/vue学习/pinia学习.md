# pinia学习
## 介绍
1. pinia，来源于西班牙语，意为菠萝，表示与菠萝一样，由很多小块组成。在pinia中，每个store都是单独存在，一同进行状态管理
2. pinia和vuex的区别
    * mutations不复存在。只有state,getters,actions
    * actions中支持同步和异步方法修改state状态
    * 与TypeScript一起使用具有可靠的类型推断支持
    * 不再有模块嵌套，只有store的概念，store之间可以互相调用
    * 支持插件扩展，可以非常方便实现本地存储等功能
    * 更加轻量，压缩后体积只有2kb左右
3. 基本用法
    * 安装
        * ```pnpm install pinia```
        * 在main.js中引入Pinia
            ```javascript
            import { createPinia } from 'pinia'

            const pinia = createPinia()
            app.use(pinia)
            ```
    * 定义一个store
        * 使用```defineStore()```定义一个Store，第一个参数是storeId，第二个参数是一个选项对象或者函数
        * 代码示例
            ```javascript
            import { defineStore } from 'pinia'
            // 函数模式需要用到以下依赖
            import { ref, computed } from 'vue'
            // 配置对象模式
            export const useCounterStore = defineStore('counter', {
                state: () => {
                    return {
                        count: 0
                    }
                },
                getters: {
                    doubleCount: (state) => state.count * 2
                },
                actions: {
                    increment () {
                        this.count++
                    }
                }
            })
            // 函数模式
            export const useCounterStore = defineStore('counter', () => {
                const count = ref(0)
                const doubleCount = computed(() => count.value * 2)
                function increment () {
                    count.value++
                }
                return {
                    count,
                    doubleCount,
                    increment
                }
            })
            ```
    * 在组件中使用
        * 在组件中导入刚才定义的函数，并执行以下这个函数，就可以获取到store了
        * 代码示例
            ```html
            <template>
                <div>{{counterStore.count}} {{counterStore.doubleCount}}</div>
            </template>
            <script setup>
            import { useCounterStore } from '@/store/counter'
            const counterStore = useCounterStore()
            // 注意：以下三种方式都会被devtools跟踪
            counterStore.count++
            counterStore.$patch({count: counterStore.count + 1})
            counterStore.increment()
            </script>
            ```
## State
1. 解构store
    * store是一个用```reactive```包裹的对象，如果直接解构会失去响应性。我们可以使用```storeToRefs()```对其进行解构
        ```html
        <script setup>
        import {storeToRefs} from 'pinia'
        import {useCounterStore} from '@/stores/counter'
        const counterStore = useCounterStore()
        const {count, doubleCount} = storeToRefs(counterStore)
        </script>
        <template>
            <div>{{count}}</div>
            <div>{{doubleCount}}</div>
        </template>
        ```
2. 修改store
    * 除了可以直接用store.count++来修改store，我们还可以调用```$patch```方法进行修改。
    * ```$patch```性能较高，并且可以同时修改多个状态
        ```html
        <script>
        import {useCounterStore} from '@/stores/counter'
        const counterStore = useCounterStore()
        counterStore.$patch({
            count: counterStore.count + 1,
            name: 'Abalam'
        })
        </script>
        ```
    * 注意：使用上述方法修改集合（比如从数组中添加、删除、插入元素），都需要创建一个新的集合，代价太高，因此，```$patch```方法也接受一个函数来批量修改
        ```javascript
        cartStore.$patch(state => {
            state.items.push({name: 'shoes', quantity: 1})
            state.hasChanged = true
        })
        ```
3. 监听store
    * 我们可以使用```$subscribe()```方法来监听store状态的变化，类似于Vuex的subscribe方法。
    * 与watch方法想比，使用```$subscribe```的优点：store多个状态发生变化之后，回调函数只会执行一次。
        ```html
        <script setup>
        import {useCounterStore} from '@/stores/counter'
        const counterStore = useCounterStore()
        counterStore.$subscribe((mutation, state) => {
            // 每当状态发生变化时，将所有state持久化到本地存储
            localStorage.setItem('counter', JSON.stringify(state))
        })
        </script>
        ```
    * 注意： 也可以监听pinia实例上所有store的变化
        ```javascript
        import {watch} from 'vue'
        import {createPinia} from 'pinia'
        const pinia = createPinia()
        watch(pinia.state, state => {
            // 每当状态发生变化时，将所有state持久化到本地存储
            localStorage.setItem('piniaState', JSON.stringify(state))
        }, {deep: true})
        ```
## Getters
1. 使用store实例
    * 大多数情况下，getter只会依赖state状态。但有时候，它会使用到其他的getter，这时候我们可以通过this访问到当前store实例
        ```javascript
        import {defineStore} from 'pinia'
        export const useCounterStore = defineStore('counter', {
            state: () => ({count: 0}),
            getters: {
                doubleCount(state) {
                    return state.count * 2
                },
                doublePlusOne() {
                    return this.doubleCount + 1
                }
            }
        })
        ```
2. 访问其他store的getter
    * 要使用其他Store的getter，可以直接在getter内部使用
        ```javascript
        import {defineStore} from 'pinia'
        import {useOtherStore} from './otherStore'

        export const useCounterStore = defineStore('counter', {
            state: () => ({count: 1}),
            getters: {
                composeGetter(state) {
                    const otherStore = useOtherStore()
                    return state.count + otherStore.count
                }
            }
        })
        ```
3. 将参数传递给getter
    * getter本质上是一个```computed```，无法向它传递任何参数。但是，我们可以让它返回一个参数以接受参数
        * 代码实例
            ```javascript
            import {defineStore} from 'pinia'
            export const useUserStore = defineStore('user', {
                state: () => ({
                    users: [{id: 1, name: 'Tom'}, {id: 2, name: 'Jack'}]
                }),
                getters: {
                    getUserById: (state) => {
                        return (userId) => state.users.find(user => user.id === userId)
                    }
                }
            })
            ```
            * 组件中使用
            ```html 
            <script setup>
            import {storeToRefs} from 'pinia'
            import {useUserStore} from '@/stores/user'

            const userStore = useUserStore()
            const {getUserById} = storeToRefs(userStore)
            </script>
            <template>
                <p>User: {{getUserById(2)}}</p>
            </template>
            ```
    * 注意点
        * 如果这样使用，getter不会缓存，它只会当作一个普通函数使用。一般不推荐这种用法，因为在组件中定义一个函数，可以实现同样的功能
## Actions
1. 访问store实例
    * 与getters一样，actions可以通过this访问当前store实例，不同的是，actions可以是异步的。
        ```javascript
        import {defineStore} from 'pinia'
        export const useUserStore = defineStore('user', {
            state: () => ({userData: null}),
            actions: {
                async registerUser(login, password) {
                    try {
                        this.userData = await api.post({ login, password })
                    } catch (error) {
                        return error
                    }
                }
            }
        })
        ```
2. 访问其他store的action
    * 要使用其他Store的action，也可以直接再action内部使用
        ```javascript
        import {defineStore} from 'pinia'
        import {useAuthStore} from './authStore'
        export const useSettingStore = defineStore('setting', {
            state: () => ({preferences: null}),
            actions: {
                async fetchUserPreferences(preferences) {
                    const authStore = useAuthStore ()
                    if (authStore.isAuthenticated()) {
                        this.preferences = await fetchPreferences()
                    } else {
                        throw new Error('User must be authenticated!')
                    }
                }
            }
        })
        ```
## Plugins
1. 介绍
    * 由于是底层API,Pinia Store完全支持扩展，以下是可以扩展的功能列表
        * 向Store添加新状态
        * 定义Store时添加新选项
        * 为Store添加新方法
        * 包装现有方法
        * 更改甚至取消操作
        * 实现本地存储等副作用
        * 仅适用于特定Store
2. 使用方法
    * Pinia插件是一个函数
        * 接受一个可选参数```context```，context包含四个属性：```app实例```、```pinia实例```、```当前store```和```选项对象```。
        * 函数也可以返回一个对象，对象的属性和方法会分别添加到state和actions中
    * 代码示例
        ```javascript
        export function myPiniaPlugin(context) {
            // context中包含四个属性
            // context.app：使用createApp()创建的app实例（仅限Vue3）
            // context.pinia：使用createPinia()创建的pinia
            // context.store：插件正在扩展的store
            // context.options：传入defineStore()的选项对象（第二个参数）
            return {
                hello: 'world', // 为state添加一个hello状态
                changeHello () { // 为actions添加一个changeHello方法
                    this.hello = 'pinia'
                }
            }
        }
        ```
        然后使用```pinia.use()```将此函数传递给pinia就可以了
        ```javascript
        // src/main.js
        import {createPinia} from 'pinia'
        const pinia = createPinia()
        pinia.use(myPiniaPlugin)
        ```
3. 常用案例
    * 向Store添加新状态
        * 可以简单地通过返回一个对象来为每个store添加状态
            ```javascript
            pinia.use(() => ({hello: 'world'}))
            ```
        * 也可以在插件传参的store上设置属性来添加状态，为了使它可以在devtools中使用，还需要对```store.$state```进行设置
            ```javascript
            import {ref, toRef} from 'vue'
            pinia.use(({store}) => {
                const hello = ref('word')
                store.$state.hello = hello
                store.hello = toRef(store.$state, 'hello')
            })
            ```
        * 也可以在use方法外面先定义一个状态，共享全局的ref或computed
            ```javascript
            import {ref} from 'vue'
            const globalSecret = ref('secret')
            pinia.use(({store}) => {
                // secret在所有store之间共享
                store.$state.secret = globalSecret
                store.secret = globalSecret
            })
            ```
    * 定义Store时添加新选项
        * 可以在定义store时添加新的选项，以便在插件中使用它们
        * 案例：添加一个```debounce```选项，允许对所有的操作进行防抖
            ```javascript
            import {defineStore} from 'pinia'
            export const useSearchStore = defineStore('search', {
                actions: {
                    searchContacts() {

                    },
                    searchContent() {

                    }
                },
                debounce: {
                    // 操作searchContacts防抖300ms
                    searchContacts: 300,
                    // 操作searchContent防抖500ms
                    searchContent: 500
                }
            })
            ```
            * 然后使用插件读取该选项，包装并替换原始操作
            ```javascript
            import {createPinia} from 'pinia'
            import {debounce} from 'lodash'

            const pinia = createPinia()
            pinia.use(({options, store}) => {
                if (options.debounce) {
                    // 我们正在用新的action覆盖原有的action
                    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
                        debouncedActions[action] = debounce(store[action], options.debounce[action])
                        return debouncedActions
                    }, {})
                }
            })
            ```
    * 实现本地存储
        * 在使用Vuex时存在这样一种情况，使用F5刷新一下页面，数据全没了，这就需要使用本地存储。Vuex中实现本地存储比较麻烦，需要把状态一个一个的存储到本地，取数据时也要进行处理，而使用Pinia，一个插件就可以解决了：```pinia-plugin-persist```
        * 实现步骤
            * 安装
                ```pnpm install pinia-plugin-persist```
            * 引入插件并传递给pinia
                ```javascript
                import {createPinia} from 'pinia'
                import piniaPluginPersist from 'pinia-plugin-persist'
                const pinia = createPinia()
                pinia.use(piniaPluginPersist)
                ```
            * 在定义store时开启persist即可
                ```javascript
                import {defineStore} from 'pinia'
                export const useCounterStore = defineStore('counter', {
                    state: () => ({count: 1}),
                    // 开启数据缓存
                    persist: {
                        enabled: true
                    }
                })
                ```
        * 注意点
            * 默认情况下，```pinia-plugin-persist```插件会以storeId作为key值，把state中的所有状态存储在sessionStorage中。我们也可以通过strategies进行修改
            ```javascript
            presist: {
                enabled: true,
                strategies: [
                    {
                        key: 'myCounter',   // 存储的key值，默认为storeId
                        storage: localStorage, // 存储的位置，默认为sessionStorage
                        paths: ['name', 'age'] // 需要存储的state状态，默认存储所有的状态
                    }
                ]
            }
            ```
## 参考网址
1. [还有人没尝过 Pinia 吗，请收下这份食用指南！](https://juejin.cn/post/7155225174151790622)