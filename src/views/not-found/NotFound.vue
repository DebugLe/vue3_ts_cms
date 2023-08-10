<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const redirectPage = () => router.push('/')
</script>

<template>
  <div class="not-found">
    <h2>您输入的地址不存在！</h2>
  </div>
  <div @click="redirectPage">点击跳转到登录页面</div>
</template>

<style lang="less" scoped>
.not-found {
  color: red;
  margin-bottom: 50px;
}
</style>
