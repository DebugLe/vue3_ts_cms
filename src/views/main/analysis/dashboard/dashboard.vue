<script setup lang="ts">
import { watchEffect } from 'vue'
import goodsCount from './c-cpns/goodsCount.vue'
import {
  pieChart,
  roseChart,
  lineChart,
  barChart,
  mapChart
} from '@/components/ECharts'
import useAnalysisStore from '@/stores/modules/main/analysis'

const analysisStore = useAnalysisStore()
analysisStore.getAmountList()
analysisStore.getGoodsCategoryCount()
analysisStore.getGoodsCategorySale()
analysisStore.getGoodsCategoryFavor()
analysisStore.getGoodsAddressSale()

let goodsCategoryCount: any[] = []
watchEffect(() => {
  goodsCategoryCount = analysisStore.goodsCategoryCount.map((item) => {
    return {
      value: item.goodsCount,
      name: item.name
    }
  })
})

let goodsCategorySaleName: any[] = []
watchEffect(() => {
  goodsCategorySaleName = analysisStore.goodsCategorySale.map((item) => {
    return item.name
  })
})

let goodsCategorySaleValue: any[] = []
watchEffect(() => {
  goodsCategorySaleValue = analysisStore.goodsCategorySale.map((item) => {
    return item.goodsCount
  })
})

let goodsCategoryFavorName: any[] = []
watchEffect(() => {
  goodsCategoryFavorName = analysisStore.goodsCategoryFavor.map((item) => {
    return item.name
  })
})

let goodsCategoryFavorValue: any[] = []
watchEffect(() => {
  goodsCategoryFavorValue = analysisStore.goodsCategoryFavor.map((item) => {
    return item.goodsFavor
  })
})

let goodsAddressSale: any[] = []
watchEffect(() => {
  goodsAddressSale = analysisStore.goodsAddressSale.map((item) => {
    return {
      value: item.count,
      name: item.address
    }
  })
})
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-count">
      <el-row :gutter="10">
        <template v-for="item in analysisStore.amountList" :key="item.amount">
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <goodsCount v-bind="item" />
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="dashboard-echarts">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="7">
          <el-card class="box-card">
            <template #header> 分类商品数量(饼图) </template>
            <pieChart :goodsCategoryCount="goodsCategoryCount" />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="10">
          <el-card class="box-card">
            <template #header> 分类商品数量(地图) </template>
            <mapChart :goodsAddressSale="goodsAddressSale" />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="7">
          <el-card class="box-card">
            <template #header> 分类商品数量(玫瑰图) </template>
            <roseChart :goodsCategoryCount="goodsCategoryCount" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :lg="12">
          <el-card class="box-card">
            <template #header> 分类商品数量(折线图) </template>
            <lineChart
              :goodsCategorySaleName="goodsCategorySaleName"
              :goodsCategorySaleValue="goodsCategorySaleValue"
            />
          </el-card>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-card class="box-card">
            <template #header> 分类商品数量(柱状图) </template>
            <barChart
              :goodsCategoryFavorName="goodsCategoryFavorName"
              :goodsCategoryFavorValue="goodsCategoryFavorValue"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
.dashboard {
  .dashboard-echarts {
    .box-card {
      margin-top: 10px;
    }
  }
}
</style>
