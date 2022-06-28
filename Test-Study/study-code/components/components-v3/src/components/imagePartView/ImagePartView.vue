<template>
  <div class="imageArea">
    <div class="baseImage" ref="baseImage" @mouseenter="visible = true" @mouseleave="visible = false" @mousemove="mouseMove">
      <img :src="url" ref="showImage" alt="">
      <div v-if="visible" class="yellow" @mousewheel="mouseWheel" ref="yellow" :style="{top: yellowY + 'px', left: yellowX + 'px', width: yellowWidth + 'px', height: yellowWidth + 'px'}"></div>
    </div>
    <div class="fixedImage">
      <img v-if="visible" :src="url" alt="" :style="{top: - yellowY * bigRate + 'px', left: - yellowX * bigRate + 'px', width: bigWidth + 'px' }">
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineComponent, ref, onMounted} from 'vue'

const props = defineProps<{
  url: string,
  biggerRate: number
}>()
const emit = defineEmits()

let visible = ref<boolean>(false)

let bigRate = ref<number>(1)
let yellowX = ref<number>(0)
let yellowY = ref<number>(0)
let yellowWidth = ref<number>(0)
let bigWidth = ref<number>(0)

let baseImage = ref<HTMLElement|null>(null)
let showImage = ref<HTMLElement|null>(null)
let yellow = ref<HTMLElement|null>(null)

// 根据放大比例计算页面图片的显示宽度
const calcLength = (tempRate: number) => {
  bigRate.value = tempRate || 5
  if (showImage.value) {
    bigWidth.value = showImage.value.offsetWidth * bigRate.value
    yellowWidth.value = 600 / bigRate.value
  }
} 
// 鼠标在图片上的移动
const mouseMove = (e: MouseEvent) => {
  if (visible.value && baseImage.value && showImage.value && yellow.value) {
    let { top: box1Top, left: box1Left } = baseImage.value?.getBoundingClientRect()
    let { top: imageTop, left: imageLeft } = showImage.value.getBoundingClientRect()
    let x = e.pageX - box1Left - yellow.value.offsetWidth / 2
    let y = e.pageY - box1Top - yellow.value.offsetHeight / 2
    // 判断小盒子是否超出图片范围
    if (x < 0) {
      x = 0
    } else if (x > showImage.value.offsetWidth - yellow.value.offsetWidth) {
      x = showImage.value.offsetWidth - yellow.value.offsetWidth
    }
    if (y < 0) {
      y = 0
    } else if (y > showImage.value.offsetHeight - yellow.value.offsetHeight) {
      y = showImage.value.offsetHeight - yellow.value.offsetHeight
    }
    // 给小盒子赋值，让小盒子随鼠标移动
    yellowX.value = x
    yellowY.value = y
  }
}
// 鼠标滚轮控制预览图的放大与缩小
const mouseWheel = (e: any) => {
  if (e.wheelDelta < 0 && bigRate.value > 3) {
    bigRate.value --
  } else if (e.wheelDelta > 0 && bigRate.value < 50) {
    bigRate.value ++
  }
  calcLength(bigRate.value)
}

onMounted(() => {
  calcLength(props.biggerRate)
})

</script>

<style scoped lang="less">
.imageArea{
  width: 300px;
  .baseImage{
    width: 100%;
    height: 100%;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .yellow{
      position: absolute;
      background-color: rgba(255, 0, 0, 0.3);
    }
  }
  .fixedImage{
    position: fixed;
    width: 600px;
    height: 600px;
    top: 0px;
    right: 0px;
    background-color: transparent;
    overflow: hidden;
    z-index: 999;
    img{
      position: relative;
    }
  }
}
</style>
