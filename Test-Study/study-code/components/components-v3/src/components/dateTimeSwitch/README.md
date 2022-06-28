# DateTimeSwitch组件
## 介绍
* 在vue3+ts的项目中，封装一个周选择组件，主要功能如下：
  * 展示一周的开始日期与结束日期
  * 选择上一周，下一周的一周开始日期与结束日期
  * 点击标签唤起日期选择器，选择具体日期后计算中对应日期一周的开始日期和结束日期
## 相关依赖
* 需要在vue3+ts的项目中使用
* 对应的UI组件库：naive-ui
  * 注意：版本需要在2.29.1之上
* 对应的图标库：xicons中的ionicons5图标
* 日期处理第三方库：date-fns
## 代码示例
```html
<template>
  <div>
    <date-time-switch initDate="2020-01-01" @update:week="getWeekInfo"></date-time-switch>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import DateTimeSwitch from '@/components/dateTimeSwitch/DateTimeSwitch.vue'

const getWeekInfo = (weekInfo: any) => {
  console.log('获取到的周信息', weekInfo)
}

</script>

<style scoped lang="less">
</style>
```
## 相关api
|参数|类型|是否必传|默认值|说明|
| --- | --- | --- | --- | --- |
|initDate|String|否|当天日期|默认初始展示的日期周 yyyy-MM-dd 格式|
|@update:week|(week: {weekBegin: string, weekEnd: string}) => void|否|undefined|周切换后的回调函数，返回周开始日期和结束日期的对象|