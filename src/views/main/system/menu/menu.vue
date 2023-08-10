<script setup lang="ts">
import moduleTable from '@/components/module-table.vue'
import tableConfig from './config/table.config'
</script>

<template>
  <div class="module">
    <el-card class="box-card">
      <moduleTable :tableConfig="tableConfig" :isShow="true" />
    </el-card>
    <moduleModal ref="modalRef" />
  </div>
</template>

<style lang="less" scoped>
.module {
  .box-card {
    margin-top: 20px;
  }
}
</style>
