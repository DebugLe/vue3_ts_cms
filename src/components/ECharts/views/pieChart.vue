<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

interface Iprops {
  goodsCategoryCount: [
    {
      value: string
      name: string
    }
  ]
}
const props = defineProps<Iprops>()

const echartsRef = ref()
onMounted(() => {
  const myChart = echarts.init(echartsRef.value)
  myChart.setOption({
    // title: {
    // text: 'Referer of a Website',
    // subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.goodsCategoryCount,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
})
</script>

<template>
  <div class="pieChart" ref="echartsRef"></div>
</template>

<style lang="less" scoped>
.pieChart {
  height: 330px;
}
</style>
