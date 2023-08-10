<!-- 账号登录 -->
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/modules/login'
import type { IAccount } from '@/types'
import { LOGIN_MEMORY } from '@/global/constants'
const loginStore = useLoginStore()

// 输入框双向绑定
const ruleForm = reactive<IAccount>({
  name: JSON.parse(localStorage.getItem(LOGIN_MEMORY) || '0').name || '',
  password: JSON.parse(localStorage.getItem(LOGIN_MEMORY) || '0').password || ''
})

// 校验
const rules = reactive<FormRules<typeof ruleForm>>({
  name: [
    { required: true, message: '必须输入帐号', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6-20位数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
})
// 点击登录按钮再次进行校验
const ruleFormRef = ref<FormInstance>()
const accountLoginOperation = (isPwd: boolean) => {
  ruleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      //校验成功发请求获取用户信息
      const name = ruleForm.name
      const password = ruleForm.password
      await loginStore.getUserInfo({ name, password })
      ElMessage({
        message: '校验成功,正在登录...',
        type: 'success'
      })
      //判断是否记住密码
      if (isPwd) {
        loginStore.memoryAccountStore(ruleForm)
      } else {
        loginStore.removeAccountStore()
      }
    } else {
      ElMessage.error('校验失败,请输入正确的账号')
    }
  })
}

defineExpose({
  accountLoginOperation
})
</script>

<template>
  <div class="account-login">
    <el-form
      ref="ruleFormRef"
      label-width="60"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="帐号" prop="name" size="large">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" size="large">
        <el-input v-model="ruleForm.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
