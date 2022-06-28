<template>
  <div>
    <date-time-switch initDate="2020-01-01" @update:week="getWeekInfo"></date-time-switch>
    <image-part-view style="width: 300px;" :biggerRate="20" url="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00613-3050.jpg"></image-part-view>
    <image-part-view style="width: 600px;" url="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00613-3050.jpg"></image-part-view>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import DateTimeSwitch from '@/components/dateTimeSwitch/DateTimeSwitch.vue'
import ImagePartView from '@/components/imagePartView/ImagePartView.vue';

const getWeekInfo = (weekInfo: any) => {
  console.log('获取到的周信息', weekInfo)
}

</script>

<style scoped lang="less">
</style>