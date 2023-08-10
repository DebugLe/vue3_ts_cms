<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import useSystemStore from '@/stores/modules/main/system'

const systemStore = useSystemStore()

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

// 重置
const searchRef = ref<InstanceType<typeof ElForm>>()
const handleResetBtn = () => {
  searchRef.value?.resetFields()
  systemStore.queryParameter = {}
  systemStore.postUserList()
}
// 查询
const handleQueryBtn = () => {
  systemStore.queryParameter = searchForm
  systemStore.postUserList()
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
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入用户名"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入真实姓名"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入手机号码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请输入状态"
              style="width: 100%"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
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
