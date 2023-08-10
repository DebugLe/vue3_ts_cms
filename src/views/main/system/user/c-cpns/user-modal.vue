<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElForm } from 'element-plus'
import useSystemStore from '@/stores/modules/main/system'
import useMainStore from '@/stores/modules/main/main'

const systemStore = useSystemStore()
const mainainStore = useMainStore()

const { roleList, dpartmentList } = storeToRefs(mainainStore)

/*增加|编辑用户开始*/
// 定义接口
interface IUserInfo {
  id?: number
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: string
  departmentId: string
}
interface IaddOrEditRes {
  code: number
  data: string
}
// 是否展示dialog
const dialogFormVisible = ref(false)
// dialog标题
const dialogTitle = ref('')
// 是否禁用密码框
const isPassword = ref(false)
// 增加|修改表单结果
const addOrEditRes = ref<IaddOrEditRes>({
  code: -1,
  data: ''
})
// ref获取表单
const addFormRef = ref<InstanceType<typeof ElForm>>()
// 校验表单
const rules = reactive({
  realname: [
    { required: true, message: '必须输入真实姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '请输入2-20位', trigger: 'blur' }
  ]
})
// 用户信息
let userInfo = reactive<IUserInfo>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
// 打开表单,add or edit form
const handleAddUserBtn = (data?: IUserInfo) => {
  if (data) {
    userInfo = data
    dialogTitle.value = '编辑用户'
    isPassword.value = true
  } else {
    dialogTitle.value = '新增用户'
  }
  dialogFormVisible.value = true
  mainainStore.reqPostRoleList()
  mainainStore.postDepartmentList()
}
// 关闭表单
const handleCancelBtn = () => {
  dialogFormVisible.value = false
  dialogTitle.value = ''
  isPassword.value = false
  userInfo = {
    name: '',
    realname: '',
    password: '',
    cellphone: '',
    roleId: '',
    departmentId: ''
  }
  // addFormRef.value?.resetFields()
}
// 确认表单
const handleConfirmBtn = async () => {
  await addFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 判断增加|修改用户
      if (userInfo.id) {
        addOrEditRes.value = await systemStore.patchEditUser(
          userInfo.id,
          userInfo
        )
      } else {
        addOrEditRes.value = await systemStore.postAddUser(userInfo)
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
      addFormRef.value?.resetFields()
      systemStore.postUserList()
    }
  })
}
/*增加|编辑用户结束*/

defineExpose({
  handleAddUserBtn
})
</script>

<template>
  <div class="user-modal">
    <div class="modal-form">
      <el-dialog
        v-model="dialogFormVisible"
        :title="dialogTitle"
        center
        width="30%"
        class="form-content"
        :before-close="handleCancelBtn"
      >
        <el-form
          ref="addFormRef"
          :model="userInfo"
          label-width="80px"
          size="large"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userInfo.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="userInfo.realname" style="width: 90%" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="userInfo.password"
              type="password"
              style="width: 90%"
              show-password
              :disabled="isPassword"
            />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="userInfo.cellphone" style="width: 90%" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="userInfo.roleId"
              placeholder="请选择角色"
              style="width: 90%"
            >
              <template v-for="item in roleList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="userInfo.departmentId"
              placeholder="请选择部门"
              style="width: 90%"
            >
              <template v-for="item in dpartmentList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
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
.user-modal {
  .modal-form {
    .form-content {
      padding: 0 20px;
    }
  }
}
</style>
