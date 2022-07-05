# 前端取消接口请求
## 简介
1. 在前端发起接口请求后，因为某些原因，不想获取该请求的返回数据了，此时需要取消接口请求
2. 需要注意的是，接口请求后，实际上是发出去了，所以想要完全取消请求，还需要后端的配合，本文主要介绍的是前端如何取消请求，不让接口返回的数据影响页面
3. 本文主要以axios为例介绍取消请求
## 应用场景
1. 切换tab页
  * 对于一些tab页面，如果切换tab的时候调用接口，然后根据返回的数据渲染页面，那么会出现接口耗时多的接口会覆盖最新的接口，导致页面显示的数据不对
  * 此时可以在每次切换的时候取消上次的接口请求，从而使返回的数据始终是最新点击的tab
2. 分页切换
  * 对于大量数据时，可能会使用分页，当加载接口比较缓慢时，可能会出现页码和实际表格数据出现偏差的情况
  * 此时可以在切换页码的同时，取消上次接口请求，从而确保表格中显示的数据的准确性
## 实现方法
1. axios原生方法
  * 原理
    * 使用CancelToken.source工厂方法创建cancel token
  * 步骤
    * 在request.js文件中新建一个取消请求函数并导出
    * 在请求配置中增加取消请求的token
    * 当要取消请求时，直接调用request中导出的取消请求函数
  * 关键代码
    * request.ts
      ```javascript
      import axios, { AxiosRequestConfig } from 'axios'
      const CancelToken = axios.CancelToken

      const ins = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 5000,
      })

      // 新建一个取消请求函数并导出
      export let cancelFn = (cancel: string) => {
        console.log(cancel)
      }
      export function request(Args: AxiosRequestConfig) {
        // 在请求配置中增加取消请求的Token
        Args.cancelToken = new CancelToken(function (cancel) {
          cancelFn = cancel
        })
        return ins.request(Args)
      }
      ```
    * 具体使用的文件中
      ```javascript
      <script setup lang="ts">
      import { ref } from 'vue'
      import { request, cancelFn } from '@/utils/request'

      const context = ref('tab1的内容...')

      const getTab1Context = async () => {
        cancelFn('取消了tab2的请求')
        const { data } = await request({
          url: '/tab1',
        })

        context.value = data
      }
      const getTab2Context = async () => {
        const { data } = await request({
          url: '/tab2',
        })

        context.value = data
      }
      const getTab3Context = async () => {
        cancelFn('取消了tab2的请求')
        const { data } = await request({
          url: '/tab3',
        })

        context.value = data
      }
      </script>
      ```
2. promise封装
  * 原理
    * Promise对象状态一旦确定就不能再改变，所以将接口请求与取消请求放在一起，如果在请求过程中没有取消，那么正常返回数据，如果请求过程中取消了，那么会立即调用取消函数，Promise状态变为reject，此时，就算请求成功了，也不会返回数据了。
  * 步骤
    * 在request.js文件中新建一个取消请求函数并导出
    * 使用Promise封装请求
    * 当要取消请求时，直接调用request中导出的取消请求函数
  * 关键代码
    * request.ts
      ```javascript
      import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

      const ins = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 5000,
      })

      // 新建一个取消请求函数并导出
      export let cancelFn = (cancel: string) => {
        console.log(cancel)
      }

      export function request(Args: AxiosRequestConfig): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
          ins.request(Args).then((res: AxiosResponse) => {
            resolve(res)
          })
          cancelFn = (msg) => {
            reject(msg)
          }
        })
      }
      ```
    * 具体在文件中的使用参考方法一中的使用
3. Promise.race
  * 原理
    * Promise.race会返回最先执行完成的结果
    * 给每一个请求身边都放一个Promise对象，当我们需要取消请求时，直接让这个Promise对象执行，这样，被取消的对象就不会被Promise.race返回了
    * 此处我们主要介绍一下取消重复请求的案例
  * 代码案例（取消重复请求）
    * cancelClass.ts
      ```javascript
      import { AxiosResponse } from 'axios'
      export class CancelablePromise {
        pendingPromise: any
        reject: any
        constructor() {
          this.pendingPromise = null
          this.reject = null
        }

        handleRequest(requestFn: any): Promise<AxiosResponse> {
          if (this.pendingPromise) {
            this.cancel('取消了上一个请求。。。')
          }
          const promise = new Promise((resolve, reject) => (this.reject = reject))
          this.pendingPromise = Promise.race([requestFn(), promise])
          return this.pendingPromise
        }

        cancel(reason: string) {
          this.reject(reason)
          this.pendingPromise = null
        }
      }
      ```
    * request.ts
      ```javascript
      export function request(Args: AxiosRequestConfig) {
        return () => ins.request(Args)
      }
      ```
    * 具体使用
      ```javascript
      <script setup lang="ts">
      import { ref } from 'vue'
      import { request } from '@/utils/request'
      import { CancelablePromise } from '@/utils/cancelClass'

      ...
      const cancelablePromise = new CancelablePromise()
      ...
      const getTab2Context = async () => {
        const { data } = await cancelablePromise.handleRequest(
          request({
            url: '/tab2',
          })
        )

        context.value = data
      }
      </script>
      ```
## 参考网址 
1. [前端取消请求与取消重复请求](https://juejin.cn/post/7108359238598000671)