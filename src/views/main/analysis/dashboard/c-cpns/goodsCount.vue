<script setup lang="ts">
import type { CountUpOptions } from 'countup.js'
import { onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'

interface Iprops {
  amount: string
  number1: number
  title: string
  tips: string
}
const props = defineProps<Iprops>()

const countupRef = ref<HTMLElement>()
const countupRef2 = ref<HTMLElement>()
//数字动画展示
onMounted(() => {
  const options: CountUpOptions = {
    duration: 1, //动画时间
    prefix: props.amount === 'saleroom' ? '￥' : '' //前缀
  }
  //两个地方需要动画
  let initCount = new CountUp(countupRef.value!, props.number1, options)
  let initCount2 = new CountUp(countupRef2.value!, props.number1, options)
  if (!initCount.error) {
    initCount.start()
  } else {
    console.error(initCount.error)
  }
  if (!initCount2.error) {
    initCount2.start()
  } else {
    console.error(initCount2.error)
  }
})
</script>

<template>
  <div class="goods-count">
    <el-card class="box-card">
      <template #header>
        <div class="header-title">
          <div class="title-text">{{ title }}</div>
          <el-tooltip
            class="box-item"
            effect="light"
            :content="tips"
            placement="top"
          >
            <el-icon><Warning /></el-icon>
          </el-tooltip>
        </div>
        <div class="header-num" ref="countupRef"></div>
      </template>
      <div class="footer">{{ title }}<span ref="countupRef2" /></div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.goods-count {
  .box-card {
    font-size: 14px;
    .header-title {
      display: flex;
      justify-content: space-between;
    }
    .header-num {
      margin-top: 10px;
      font-size: 26px;
    }
    :deep(.el-card__header) {
      padding: 10px 20px;
    }
    :deep(.el-card__body) {
      padding: 10px 20px;
    }
  }
}
</style>
