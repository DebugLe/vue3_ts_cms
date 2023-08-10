<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElForm, ElTree } from 'element-plus'
import useSystemStore from '@/stores/modules/main/system'
import useMainStore from '@/stores/modules/main/main'

const systemStore = useSystemStore()
const mainainStore = useMainStore()

mainainStore.postCompleteMenuList()
const { menuLists } = storeToRefs(mainainStore)

/*增加|编辑模块开始*/
// 定义接口
interface IModuleInfo {
  id?: number
  name: string
  intro: string
  menuList: any[]
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
const treeRef = ref<InstanceType<typeof ElTree>>()
// 模块信息
let moduleInfo = reactive<IModuleInfo>({
  name: '',
  intro: '',
  menuList: []
})
// 打开表单
// 递归出编辑时默认选中的checked id
let checkedKeys = reactive<any[]>([])
const mapCheckedKeys = (data: any[]) => {
  for (const item of data) {
    item.children ? mapCheckedKeys(item.children) : checkedKeys.push(item.id)
  }
}
// add or edit form
const handleAddOrEditModule = (data?: IModuleInfo) => {
  if (data) {
    moduleInfo = data
    mapCheckedKeys(data.menuList)
    dialogTitle.value = '编辑角色'
  } else {
    dialogTitle.value = '新增角色'
  }
  dialogFormVisible.value = true
}
// 关闭表单
const handleCancelBtn = () => {
  dialogFormVisible.value = false
  dialogTitle.value = ''
  moduleInfo = {
    name: '',
    intro: '',
    menuList: []
  }
  checkedKeys = []
}
// 确认表单
const handleConfirmBtn = async () => {
  await addOrEditFormRef.value?.validate(async (valid) => {
    if (valid) {
      //拿到当前选中id和其父id
      moduleInfo.menuList = []
      treeRef.value!.getCheckedNodes(false, true).forEach((item) => {
        moduleInfo.menuList.push(item.id)
      })
      // 判断增加|修改模块
      if (moduleInfo.id) {
        addOrEditRes.value = await systemStore.patchEditModule(
          'role',
          moduleInfo.id,
          moduleInfo
        )
      } else {
        addOrEditRes.value = await systemStore.postAddModule('role', moduleInfo)
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
      systemStore.postModuleList('role')
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
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="moduleInfo.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="角色描述" prop="intro">
            <el-input v-model="moduleInfo.intro" style="width: 90%" />
          </el-form-item>
          <el-form-item>
            <el-tree
              ref="treeRef"
              :data="menuLists"
              show-checkbox
              node-key="id"
              :default-checked-keys="checkedKeys"
              :props="{
                children: 'children',
                label: 'name'
              }"
            />
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
