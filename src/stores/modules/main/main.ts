import { defineStore } from 'pinia'
import {
  reqPostRoleList,
  reqPostDepartmentList,
  reqPostCompleteMenuList
} from '@/service/modules/main/main'

interface IMainStore {
  roleList: any[]
  dpartmentList: any[]
  menuLists: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    roleList: [],
    dpartmentList: [],
    menuLists: []
  }),
  actions: {
    // 获取角色列表
    async reqPostRoleList() {
      const roleRes = await reqPostRoleList()
      this.roleList = roleRes.data.data.list
    },
    // 获取部门列表
    async postDepartmentList() {
      const dpartmentRes = await reqPostDepartmentList()
      this.dpartmentList = dpartmentRes.data.data.list
    },
    // 获取完整菜单列表
    async postCompleteMenuList() {
      const menuRes = await reqPostCompleteMenuList()
      this.menuLists = menuRes.data.data.list
    }
  }
})

export default useMainStore
