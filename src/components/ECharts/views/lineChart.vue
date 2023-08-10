<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

interface Iprops {
  goodsCategorySaleName: string[]
  goodsCategorySaleValue: string[]
}
const props = defineProps<Iprops>()

const lineChart = ref()
onMounted(() => {
  const myChart = echarts.init(lineChart.value)
  myChart.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.goodsCategorySaleName
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.goodsCategorySaleValue,
        type: 'line',
        areaStyle: {}
      }
    ]
  })
})
</script>

<template>
  <div class="lineChart" ref="lineChart"></div>
</template>

<style lang="less" scoped>
.lineChart {
  height: 330px;
}
</style>
