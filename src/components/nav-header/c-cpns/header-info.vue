<script setup lang="ts">
import { useRouter } from 'vue-router'
import useLoginStore from '@/stores/modules/login'

const router = useRouter()
const LoginStore = useLoginStore()

// 退出登录
const toLoginPage = () => {
  LoginStore.LogoutStore()
  router.push('/login')
}
</script>

<template>
  <div class="header-info">
    <div class="info-icon">
      <el-icon size="20"><Bell /></el-icon>
    </div>
    <div class="info-icon">
      <el-icon size="20"><ChatDotRound /></el-icon>
    </div>
    <div class="info-icon">
      <el-icon size="20"><Postcard /></el-icon>
    </div>
    <div class="info-mine">
      <el-dropdown>
        <span class="mine-fold">
          <img class="mine-img" src="../../../assets//img/logo.svg" alt="" />
          <div class="mine-name">Debug</div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toLoginPage">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  .info-icon {
    padding: 10px 15px;
    &:hover {
      background-color: #ccc;
    }
  }

  .info-mine {
    .mine-fold {
      display: flex;
      align-items: center;
      .mine-img {
        width: 30px;
        margin: 0 10px;
      }
    }
    :global(.el-dropdown-menu__item) {
      line-height: 36px;
      padding: 6px 22px;
    }
  }
}
</style>
