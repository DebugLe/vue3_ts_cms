<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/modules/main/system'
import { formatTime } from '@/utils/parseDateFull'
import moduleModal from './module-modal.vue'
import { matchDepartment } from '@/utils/matchDepartment'

const systemStore = useSystemStore()

//发请求获取列表数据
systemStore.postModuleList('department')

// 热加载pinia中的数据
const { moduleList, totalCount } = storeToRefs(systemStore)

// 获取moduleModal组件
const modalRef = ref<InstanceType<typeof moduleModal>>()
// 调用moduleModal组件中方法
const handleAddOrEditModule = (data?: any) => {
  modalRef.value?.handleAddOrEditModule(data)
}

// 自定义索引
const indexMethod = (index: number) => {
  return index + (currentPage.value - 1) * pageSize.value + 1
}

// 删除用户
const handleDeleteModule = async (Id: number) => {
  const deleteRes = await systemStore.deleteModule('department', Id)
  if (deleteRes.code === 0) {
    ElNotification({
      title: '删除成功',
      message: deleteRes.data,
      type: 'success'
    })
    systemStore.postModuleList('department')
  } else {
    ElNotification({
      title: '删除失败',
      message: deleteRes.data,
      type: 'error'
    })
  }
}

//修改一页显示多少条数据 || 前往某一页，重新发请求
let currentPage = ref(1)
let pageSize = ref(10)
const handlePagination = () => {
  const offset = (currentPage.value - 1) * pageSize.value
  const size = pageSize.value
  systemStore.postModuleList('department', offset, size)
}
</script>

<template>
  <div class="module-table">
    <div class="table-header">
      <div class="header-title">部门列表</div>
      <el-button size="large" type="primary" @click="handleAddOrEditModule()"
        >新建部门</el-button
      >
    </div>
    <div class="table-content">
      <el-table :data="moduleList" style="width: 100%" border size="large">
        <el-table-column align="center" type="selection" width="60" />
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="70"
          align="center"
        />
        <el-table-column
          prop="name"
          align="center"
          label="部门名称"
          width="150"
        />
        <el-table-column
          align="center"
          prop="leader"
          label="部门领导"
          width="150"
        />
        <el-table-column
          align="center"
          prop="parentId"
          label="上级部门"
          width="150"
        >
          <template #default="scope">
            {{ matchDepartment(scope.row.parentId) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatTime(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatTime(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="170">
          <template #default="scope">
            <el-button
              icon="EditPen"
              type="primary"
              size="small"
              text
              @click="handleAddOrEditModule(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确定要删除吗?"
              @confirm="handleDeleteModule(scope.row.id)"
            >
              <template #reference>
                <el-button icon="Delete" type="danger" size="small" text>
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handlePagination"
        @current-change="handlePagination"
      />
    </div>
    <moduleModal ref="modalRef" />
  </div>
</template>

<style lang="less" scoped>
.module-table {
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
  }
  .table-footer {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>
