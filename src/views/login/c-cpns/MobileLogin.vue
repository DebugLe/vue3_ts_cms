<!-- 手机登录 -->
<script setup lang="ts">
import { reactive } from 'vue'
import type { IPhone } from '@/types'

// 输入框双向绑定
const ruleForm = reactive<IPhone>({
  phone: '',
  validate: ''
})
</script>

<template>
  <div class="mobile-login">
    <el-form
      label-width="60"
      :model="ruleForm"
      status-icon
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" size="large">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" size="large">
        <div class="mobile-validate">
          <el-input v-model="ruleForm.validate" />
          <el-button type="primary" size="small">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.mobile-login {
  .mobile-validate {
    display: flex;
    :deep(.el-button) {
      margin-left: 10px;
    }
  }
}
</style>
