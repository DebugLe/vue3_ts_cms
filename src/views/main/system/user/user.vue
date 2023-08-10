<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userTable from './c-cpns/user-table.vue'
</script>

<template>
  <div class="user">
    <el-card>
      <userSearch />
    </el-card>
    <el-card class="box-card">
      <userTable />
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.user {
  .box-card {
    margin-top: 20px;
  }
}
</style>
