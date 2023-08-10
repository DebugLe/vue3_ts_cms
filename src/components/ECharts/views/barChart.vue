<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

interface Iprops {
  goodsCategoryFavorName: string[]
  goodsCategoryFavorValue: string[]
}
const props = defineProps<Iprops>()

const barChart = ref()
onMounted(() => {
  const myChart = echarts.init(barChart.value)
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: props.goodsCategoryFavorName
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.goodsCategoryFavorValue,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  })
})
</script>

<template>
  <div class="barChart" ref="barChart"></div>
</template>

<style lang="less" scoped>
.barChart {
  height: 330px;
}
</style>
