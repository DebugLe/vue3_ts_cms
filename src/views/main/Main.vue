<script setup lang="ts">
import NavMenu from '@/components/nav-menu/nv-menu.vue'
import NavHeader from '@/components/nav-header/nav-header.vue'
import { ref } from 'vue'

const isLaunch = ref(true)
const handleCollapse = (isCollapse: boolean) => {
  isLaunch.value = isCollapse
}
</script>

<template>
  <div class="main">
    <el-container>
      <el-aside :width="isLaunch ? '210px' : '60px'">
        <NavMenu :isLaunch="isLaunch" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <NavHeader @handleCollapse="handleCollapse" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.1s linear;
    // 去除侧边栏滚动条
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-container {
    height: 100%;
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
