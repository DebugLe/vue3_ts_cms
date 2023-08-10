<script setup lang="ts">
import useLoginStore from '@/stores/modules/login'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()
const router = useRouter()

defineProps({
  isLaunch: {
    type: Boolean,
    default: true
  }
})

// 点击一级菜单展示对应页面
const handleOpen = (key: string) => {
  router.push(key)
}

// 点击logo展示主页
const toMainPage = () => {
  router.push('/main')
}
</script>

<template>
  <div class="main-aside">
    <div class="aside-logo" @click="toMainPage">
      <img class="logo-img" src="../../assets/img/logo.svg" alt="" />
      <div class="logo-text" v-show="isLaunch">后台管理系统</div>
    </div>
    <div class="aside-meaun">
      <!--:default-active="$route.path" 高亮菜单为当前路径对应菜单  -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#fff"
        router
        :collapse="!isLaunch"
        unique-opened
      >
        <template
          v-for="firstLevel in loginStore.userMenu"
          :key="firstLevel.id"
        >
          <el-sub-menu :index="firstLevel.url">
            <template #title>
              <el-icon>
                <component :is="firstLevel.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ firstLevel.name }}</span>
            </template>
            <template
              v-for="secondLevel in firstLevel.children"
              :key="secondLevel.id"
            >
              <el-menu-item :index="secondLevel.url">{{
                secondLevel.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-aside {
  background-color: #0c2135;
  height: 100%;
  .aside-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #fff;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    .logo-img {
      width: 30px;
      margin-right: 10px;
    }
  }
  .aside-meaun {
    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
    .el-menu-item:hover {
      background-color: #0a60bd;
    }
  }
}
</style>
