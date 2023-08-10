<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import useSystemStore from '@/stores/modules/main/system'

const systemStore = useSystemStore()

/*增加|编辑模块开始*/
// 定义接口
interface IModuleInfo {
  id?: number
  name: string
}
interface IaddOrEditRes {
  code: number
  data: string
}
// 是否展示dialog
const dialogFormVisible = ref(false)
// dialog标题
const dialogTitle = ref('')
// 增加|修改表单结果
const addOrEditRes = ref<IaddOrEditRes>({
  code: -1,
  data: ''
})
// ref获取表单
const addOrEditFormRef = ref<InstanceType<typeof ElForm>>()
// 模块信息
let moduleInfo = reactive<IModuleInfo>({
  name: ''
})
// 打开表单
// add or edit form
const handleAddOrEditModule = (data?: IModuleInfo) => {
  if (data) {
    moduleInfo = data
    dialogTitle.value = '编辑类别'
  } else {
    dialogTitle.value = '新增类别'
  }
  dialogFormVisible.value = true
}
// 关闭表单
const handleCancelBtn = () => {
  dialogFormVisible.value = false
  dialogTitle.value = ''
  moduleInfo = {
    name: ''
  }
  systemStore.postModuleList('category')
}
// 确认表单
const handleConfirmBtn = async () => {
  await addOrEditFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 判断增加|修改模块
      if (moduleInfo.id) {
        addOrEditRes.value = await systemStore.patchEditModule(
          'category',
          moduleInfo.id,
          moduleInfo
        )
      } else {
        addOrEditRes.value = await systemStore.postAddModule(
          'category',
          moduleInfo
        )
      }
      // 判断提示类型
      if (addOrEditRes.value.code === 0) {
        ElMessage({
          message: addOrEditRes.value.data,
          type: 'success'
        })
      } else {
        ElMessage.error(addOrEditRes.value.data)
      }
      dialogFormVisible.value = false
      addOrEditFormRef.value?.resetFields()
      systemStore.postModuleList('category')
    }
  })
}
/*增加|编辑模块结束*/

defineExpose({
  handleAddOrEditModule
})
</script>

<template>
  <div class="module-modal">
    <div class="modal-form">
      <el-dialog
        v-model="dialogFormVisible"
        :title="dialogTitle"
        center
        width="30%"
        class="form-content"
        :before-close="handleCancelBtn"
      >
        <!-- :rules="rules" -->
        <el-form
          ref="addOrEditFormRef"
          :model="moduleInfo"
          label-width="80px"
          size="large"
        >
          <el-form-item label="类别名称" prop="name">
            <el-input v-model="moduleInfo.name" style="width: 90%" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCancelBtn">取消</el-button>
            <el-button type="primary" @click="handleConfirmBtn">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="less" scoped>
.module-modal {
  .modal-form {
    .form-content {
      padding: 0 20px;
    }
  }
}
</style>
