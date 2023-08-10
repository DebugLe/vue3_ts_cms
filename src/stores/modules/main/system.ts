import { defineStore } from 'pinia'
import {
  reqPostUserList,
  reqDeleteUser,
  reqPostAddUser,
  reqPatchEditUser,
  reqPostModuleList,
  reqDeleteModule,
  reqPostAddModule,
  reqPatchEditModule
} from '@/service/modules/main/system'

interface ISystemStore {
  userList: any[]
  totalCount: number
  queryParameter: {}
  moduleList: any[]
}

const useSystemStore = defineStore('system', {
  state: (): ISystemStore => ({
    userList: [],
    totalCount: 0,
    queryParameter: {},
    moduleList: []
  }),
  actions: {
    // 获取用户列表
    async postUserList(offset = 0, size = 10) {
      const userListRes = await reqPostUserList({
        offset,
        size,
        ...this.queryParameter
      })
      const { list, totalCount } = userListRes.data.data
      this.userList = list
      this.totalCount = totalCount
    },
    // 删除用户
    async deleteUser(userId: number) {
      const deleteRes = await reqDeleteUser(userId)
      return deleteRes.data
    },
    // 增加用户
    async postAddUser(data: any) {
      const addRes = await reqPostAddUser(data)
      return addRes.data
    },
    // 编辑用户
    async patchEditUser(userId: number, data: any) {
      const editRes = await reqPatchEditUser(userId, data)
      return editRes.data
    },
    // 获取模块列表
    async postModuleList(moduleName: string, offset = 0, size = 10) {
      const moduleListRes = await reqPostModuleList(moduleName, {
        offset,
        size,
        ...this.queryParameter
      })
      const { list, totalCount } = moduleListRes.data.data
      this.moduleList = list
      this.totalCount = totalCount
    },
    // 删除模块
    async deleteModule(moduleName: string, Id: number) {
      const deleteRes: any = await reqDeleteModule(moduleName, Id)
      return deleteRes.data
    },
    // 增加模块
    async postAddModule(moduleName: string, data: any) {
      const addRes = await reqPostAddModule(moduleName, data)
      return addRes.data
    },
    // 编辑模块
    async patchEditModule(moduleName: string, Id: number, data: any) {
      const editRes = await reqPatchEditModule(moduleName, Id, data)
      return editRes.data
    }
  }
})

export default useSystemStore
