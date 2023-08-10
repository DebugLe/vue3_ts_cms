<script setup lang="ts">
import moduleSearch from './c-cpns/module-search.vue'
import moduleTable from './c-cpns/module-table.vue'
</script>

<template>
  <div class="department">
    <el-card>
      <moduleSearch />
    </el-card>
    <el-card class="box-card">
      <moduleTable />
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.department {
  .box-card {
    margin-top: 20px;
  }
}
</style>
