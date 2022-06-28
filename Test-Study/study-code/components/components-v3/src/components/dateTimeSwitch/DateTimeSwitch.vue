<template>
  <div class="time_switch">
    <n-icon class="icon" @click="changeWeek('prev')">
      <ArrowBack/>
    </n-icon>
    <n-popover :show="showDatePop" trigger="manual" @clickoutside="showDatePop = false">
      <template #trigger>
        <label class="date_label" style="margin: 0px 10px;" @click="showDatePop = !showDatePop">{{formatName}}</label>
      </template>
      <n-date-picker v-model:value="date"  type="date" :actions="['now']" panel @update:value="dataChange"/>
    </n-popover>
    <n-icon class="icon" @click="changeWeek('next')">
      <ArrowForwardOutline/>
    </n-icon>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, reactive } from 'vue'
import { startOfWeek, format, endOfWeek, addDays } from 'date-fns'
import { NIcon, NPopover, NDatePicker } from 'naive-ui'
import { ArrowBack, ArrowForwardOutline } from '@vicons/ionicons5'

const props = defineProps<{
  initDate?: string
}>()
const emit = defineEmits<{
  (event: 'update:week', week: {weekBegin: string, weekEnd: string}): void
}>()

// 展示的日期
let formatName = ref('')
// 日期选择器选择的日期
const date = ref(new Date().getTime())
// 存储的周相关参数
const weeks = reactive<{name: string, from: string, to: string}>({
  name: '',
  from: '',
  to: ''
})
// 根据日期获取相关的周参数
const getDates = (date: Date | number) => {
  const startDate = startOfWeek(date, { weekStartsOn: 1 })
  const endDate = endOfWeek(date, { weekStartsOn: 1 })
  let str = 'yyyy-MM-dd'
  weeks.from = format(startDate, str)
  weeks.to = format(endDate, str)
  weeks.name = format(startDate, str) +'~'+format(endDate, str)
  formatName.value = weeks.name
  // 接下来执行选择时间之后的触发事件
  emit('update:week', {weekBegin: weeks.from, weekEnd: weeks.to})
}
// 日期箭头
const changeWeek = (type: 'prev' | 'next' | 'cur') => {
  switch (type) {
    case 'prev':
      date.value = addDays(date.value, -7).getTime()
      break
    case 'next':
      date.value = addDays(date.value, 7).getTime()
      break
    case 'cur':
      date.value = addDays(date.value, 0).getTime()
      break
  }
  return getDates(date.value)
}
// 是否展示日期选择弹窗
let showDatePop = ref(false)
// 日期选择弹窗选中的触发事件
const dataChange = (value: any) => {
  if (!value) {
    date.value = new Date().getTime()
  }
  showDatePop.value = false
  getDates(value)
}

onMounted(() => {
  date.value = props.initDate ? new Date(props.initDate).getTime() : new Date().getTime()
  getDates(date.value)
})
</script>

<style scoped lang="less">
.time_switch{
  display: flex;
  align-items: center;
  .icon{
    cursor: pointer;
  }
  .date_label{
    cursor: pointer;
  }
}
</style>