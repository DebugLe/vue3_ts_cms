<!-- 登录面板 -->
<script setup lang="ts">
import { ref } from 'vue'
// 账号登录
import AccountLogin from './AccountLogin.vue'
// 手机登录
import MobileLogin from './MobileLogin.vue'
import { IS_CHECK } from '@/global/constants'

// 判断登录方式
const selectTab = ref('account')
// 是否记住密码
const isRememberPassword = ref(
  JSON.parse(localStorage.getItem(IS_CHECK) || '0') || false
)

// ref获取账号登录组件
const accountRef = ref<InstanceType<typeof AccountLogin>>()
// 登录按钮处理
const handleLoginBtn = () => {
  // 账号登录操作
  if (selectTab.value == 'account') {
    // 账号登录操作,传入是否记住密码
    accountRef.value?.accountLoginOperation(isRememberPassword.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="login-title">后台管理系统</h1>
    <div class="login-method">
      <el-tabs type="border-card" stretch v-model="selectTab">
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </span>
          </template>
          <AccountLogin ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </span>
          </template>
          <MobileLogin />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="login-operation">
      <el-checkbox v-model="isRememberPassword" label="记住密码" />
      <el-link type="primary" href="https://element-plus.org" target="_blank">
        忘记密码
      </el-link>
    </div>
    <div class="login-btn">
      <el-button type="primary" @click="handleLoginBtn">立即登录</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  .login-title {
    text-align: center;
    margin: 20px 0;
  }
  .login-method {
    .custom-tabs-label {
      display: flex;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }
  .login-operation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0;
  }
  :deep(.el-button) {
    width: 100%;
    height: 40px;
  }
}
</style>
