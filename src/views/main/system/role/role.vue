<script setup lang="ts">
import { ref } from 'vue'
import moduleModal from './c-cpns/module-modal.vue'
import moduleSearch from '@/components/module-search.vue'
import moduleTable from '@/components/module-table.vue'
import searchConfig from './config/search.config'
import tableConfig from './config/table.config'
import useLoginStore from '@/stores/modules/login'
import { mapButtonPermissions } from '@/utils/matchRoute'

const loginStore = useLoginStore()
// 查
const query = !!mapButtonPermissions(loginStore.userMenu).find((item) => {
  return item.includes(`system:${tableConfig.moduleName}:query`)
})

const modalRef = ref<InstanceType<typeof moduleModal>>()

const handleAddOrEditModule = (data?: any) => {
  modalRef.value?.handleAddOrEditModule(data)
}
</script>

<template>
  <div class="module">
    <el-card v-if="query">
      <moduleSearch :searchConfig="searchConfig" />
    </el-card>
    <el-card class="box-card">
      <moduleTable
        :tableConfig="tableConfig"
        @handleAddOrEditModule="handleAddOrEditModule"
      >
        <template #testOne="scope">
          <img
            style="width: 20px"
            src="../../../../assets/img/logo.svg"
            alt=""
          />
          <span>{{ scope.name }}</span>
        </template>
      </moduleTable>
    </el-card>
    <moduleModal ref="modalRef" />
  </div>
</template>

<style lang="less" scoped>
.module {
  .box-card {
    margin-top: 20px;
  }
}
</style>
