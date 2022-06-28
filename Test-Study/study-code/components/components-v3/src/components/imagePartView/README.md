# ImagePartView组件
## 介绍
* 在日常使用中，有时会遇到图片局部预览需求（类似淘宝网页版的图片放大），主要功能如下：
  * 图片的局部预览，移动鼠标可以查看对应图片的局部放大细节
  * 滚动鼠标滚轮改变放大的比例
## 相关依赖
* 需要在vue3+ts的项目中使用
## 代码示例
```html
<template>
  <div>
    <image-part-view style="width: 300px;" :biggerRate="20" url="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00613-3050.jpg"></image-part-view>
    <image-part-view style="width: 600px;" url="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00613-3050.jpg"></image-part-view>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import ImagePartView from '@/components/imagePartView/ImagePartView.vue';

</script>

<style scoped lang="less">
</style>
```
## 相关api
|参数|类型|是否必传|默认值|说明|
| --- | --- | --- | --- | --- |
|biggerRate|number|否|5|图片初始放大倍数|
|url|string|是|undefined|图片url|
