<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import useSystemStore from '@/stores/modules/main/system'

const systemStore = useSystemStore()

//定义defineProps泛型类型
interface IsearchConfig {
  searchConfig: {
    moduleName: string
    formItem: any[]
  }
}
const props = defineProps<IsearchConfig>()

const initialForm: any = {}
for (const item of props.searchConfig.formItem) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

// 重置
const searchRef = ref<InstanceType<typeof ElForm>>()
const handleResetBtn = () => {
  searchRef.value?.resetFields()
  systemStore.queryParameter = {}
  systemStore.postModuleList(props.searchConfig.moduleName)
}
// 查询
const handleQueryBtn = () => {
  systemStore.queryParameter = searchForm
  systemStore.postModuleList(props.searchConfig.moduleName)
}
</script>

<template>
  <div class="userSearch">
    <el-form
      ref="searchRef"
      size="large"
      :model="searchForm"
      label-width="80px"
    >
      <el-row>
        <template v-for="item in searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  :style="item.style"
                />
              </template>
              <template v-if="item.type === 'picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  :range-separator="item.rangeSeparator"
                  :start-placeholder="item.startPlaceholder"
                  :end-placeholder="item.endPlaceholder"
                  size="large"
                  :style="item.style"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetBtn">
        重置
      </el-button>
      <el-button
        size="large"
        type="primary"
        icon="Search"
        @click="handleQueryBtn"
        >查询</el-button
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.userSearch {
  .el-form-item {
    padding: 20px 60px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding-right: 70px;
  }
}
</style>
../config/search.config
