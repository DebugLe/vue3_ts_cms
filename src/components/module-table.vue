<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/stores/modules/main/system'
import useLoginStore from '@/stores/modules/login'
import { formatTime } from '@/utils/parseDateFull'
import { mapButtonPermissions } from '@/utils/matchRoute'

const systemStore = useSystemStore()
const loginStore = useLoginStore()

interface ItableConfig {
  tableConfig: {
    moduleName: string
    title: string
    addBtnText: string
    tableColumn: any[]
  }
  isShow?: Boolean
}
const props = defineProps<ItableConfig>()
const emit = defineEmits(['handleAddOrEditModule'])

// 增
const create = !!mapButtonPermissions(loginStore.userMenu).find((item) => {
  return item.includes(`system:${props.tableConfig.moduleName}:create`)
})
// 删
const remove = !!mapButtonPermissions(loginStore.userMenu).find((item) => {
  return item.includes(`system:${props.tableConfig.moduleName}:delete`)
})
// 改
const update = !!mapButtonPermissions(loginStore.userMenu).find((item) => {
  return item.includes(`system:${props.tableConfig.moduleName}:update`)
})
// 查
const query = !!mapButtonPermissions(loginStore.userMenu).find((item) => {
  return item.includes(`system:${props.tableConfig.moduleName}:query`)
})

//发请求获取列表数据
if (query) systemStore.postModuleList(props.tableConfig.moduleName)

// 热加载pinia中的数据
const { moduleList, totalCount } = storeToRefs(systemStore)

// 自定义索引
const indexMethod = (index: number) => {
  return index + (currentPage.value - 1) * pageSize.value + 1
}

// 编辑|增加
const handleAddOrEditModule = (data?: any) => {
  emit('handleAddOrEditModule', data)
}

// 删除用户
const handleDeleteModule = async (Id: number) => {
  const deleteRes = await systemStore.deleteModule(
    props.tableConfig.moduleName,
    Id
  )
  if (deleteRes.code === 0) {
    ElNotification({
      title: '删除成功',
      message: deleteRes.data,
      type: 'success'
    })
    // systemStore.postModuleList(props.tableConfig.moduleName)
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
  systemStore.postModuleList(props.tableConfig.moduleName, offset, size)
}

// 监听仓库中调用增加|修改|删除数据接口后,更改分页栏当前页
systemStore.$onAction(({ name }) => {
  if (
    name === 'patchEditModule' ||
    name === 'postAddModule' ||
    name === 'deleteModule'
  ) {
    currentPage.value = 1
    systemStore.postModuleList(props.tableConfig.moduleName)
  }
})
</script>

<template>
  <div class="module-table">
    <div class="table-header" v-if="!isShow">
      <div class="header-title">{{ tableConfig.title }}</div>
      <el-button
        v-if="create"
        size="large"
        type="primary"
        @click="handleAddOrEditModule()"
        >{{ tableConfig.addBtnText }}</el-button
      >
    </div>
    <div class="table-content">
      <el-table
        :data="moduleList"
        style="width: 100%"
        border
        size="large"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <template v-for="item in tableConfig.tableColumn" :key="item.prop">
          <template v-if="item.type === 'selection'">
            <el-table-column align="center" type="selection" width="60" />
          </template>
          <template v-if="item.type === 'index'">
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              width="70"
              align="center"
            />
          </template>
          <template v-if="item.type === 'text'">
            <el-table-column
              :prop="item.prop"
              :align="item.align"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip
            />
          </template>
          <template v-if="item.type === 'tag'">
            <el-table-column
              :prop="item.prop"
              :align="item.align"
              :label="item.label"
              :width="item.width"
            >
              <template #default="scope">
                <el-tag
                  :type="scope.row[item.prop] === 1 ? 'success' : 'danger'"
                >
                  {{ scope.row[item.prop] === 1 ? '启用' : '禁用' }}
                </el-tag>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'time'">
            <el-table-column
              :align="item.align"
              :prop="item.prop"
              :label="item.label"
            >
              <template #default="scope">
                {{ formatTime(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'slot'">
            <el-table-column
              :prop="item.prop"
              :align="item.align"
              :label="item.label"
              :width="item.width"
            >
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope.row"></slot>
              </template>
            </el-table-column>
          </template>
        </template>
        <template v-if="!isShow">
          <el-table-column
            v-if="remove || update"
            align="center"
            label="操作"
            width="170"
          >
            <template #default="scope">
              <el-button
                v-if="update"
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
                  <el-button
                    v-if="remove"
                    icon="Delete"
                    type="danger"
                    size="small"
                    text
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="table-footer" v-if="!isShow">
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
