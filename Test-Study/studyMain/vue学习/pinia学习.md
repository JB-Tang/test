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
## Getters
## Actions
## Plugins
## 
## 参考网址
1. [还有人没尝过 Pinia 吗，请收下这份食用指南！](https://juejin.cn/post/7155225174151790622)