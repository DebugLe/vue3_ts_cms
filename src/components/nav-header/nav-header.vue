<script setup lang="ts">
import { ref } from 'vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'
import HeaderInfo from './c-cpns/header-info.vue'

const emit = defineEmits(['handleCollapse'])

//切换展开收缩菜单Icon && 传递给父组件
const isCollapse = ref(true)
const handleCollapseClick = () => {
  isCollapse.value = !isCollapse.value
  emit('handleCollapse', isCollapse.value)
}
</script>

<template>
  <div class="main-header">
    <div class="header-icon" @click="handleCollapseClick">
      <el-icon size="26">
        <component :is="isCollapse ? 'fold' : 'expand'" />
      </el-icon>
    </div>
    <div class="header-content">
      <HeaderCrumb />
      <HeaderInfo />
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  .header-icon {
    margin-right: 10px;
    cursor: pointer;
  }
  .header-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
