<!-- 登录页 -->
<script setup lang="ts">
import LoginPanel from './c-cpns/LoginPanel.vue'
</script>

<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../../assets//img/login-bg.svg);
}
</style>
