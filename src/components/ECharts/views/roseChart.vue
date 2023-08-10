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

const roseChart = ref()
onMounted(() => {
  const myChart = echarts.init(roseChart.value)
  myChart.setOption({
    // title: {
    //   text: 'Nightingale Chart',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
      // formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    //
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        // name: 'Radius Mode',
        type: 'pie',
        radius: [20, 140],
        // center: ['25%', '50%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: props.goodsCategoryCount
      }
    ]
  })
})
</script>

<template>
  <div class="roseChart" ref="roseChart"></div>
</template>

<style lang="less" scoped>
.roseChart {
  height: 330px;
}
</style>
