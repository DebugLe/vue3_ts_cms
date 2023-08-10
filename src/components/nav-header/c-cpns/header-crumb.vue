<script setup lang="ts">
import { useRoute } from 'vue-router'
import { mapBreadCrumbs } from '@/utils/matchRoute'
import useLoginStore from '@/stores/modules/login'
import { computed } from 'vue'

const route = useRoute()
const loginStore = useLoginStore()

// 使用计算属性可以实现面包屑内容的热加载
const currentCrumbs = computed(() => {
  return mapBreadCrumbs(route.path, loginStore.userMenu)
})
</script>

<template>
  <div class="header-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in currentCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped></style>
