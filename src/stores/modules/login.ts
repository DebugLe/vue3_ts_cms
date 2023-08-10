import { defineStore } from 'pinia'
import {
  reqGetUserInfo,
  reqGetUserDetailedInfo,
  reqGetUserMenu
} from '@/service/modules/login'
import type { IAccount } from '@/types'
import {
  LOGIN_TOKEN,
  LOGIN_MEMORY,
  IS_CHECK,
  USER_MENU,
  USER_INFO
} from '@/global/constants'
import { matchRoute } from '@/utils/matchRoute'
import router from '@/router'

interface ILoginStore {
  userInfo: {}
  userMenu: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginStore => ({
    userInfo: JSON.parse(localStorage.getItem(USER_INFO) || '0') ?? {},
    userMenu: JSON.parse(localStorage.getItem(USER_MENU) || '0') ?? []
  }),
  actions: {
    // 获取用户信息
    async getUserInfo(data: IAccount) {
      // 获取用户基本信息(id, token)
      const loginRes = await reqGetUserInfo(data)
      const userId = loginRes.data.data.id
      localStorage.setItem(LOGIN_TOKEN, loginRes.data.data.token)
      // 获取用户详细信息(角色)
      const detailedRes = await reqGetUserDetailedInfo(userId)
      this.userInfo = detailedRes.data.data
      localStorage.setItem(USER_INFO, JSON.stringify(detailedRes.data.data))
      // 获取用户菜单
      const menuRes = await reqGetUserMenu(detailedRes.data.data.id)
      this.userMenu = menuRes.data.data
      localStorage.setItem(USER_MENU, JSON.stringify(menuRes.data.data))
      //拿到用户所拥有的路由进行遍历添加到路由上形成可访问路由
      const matchRoutes = matchRoute(this.userMenu)
      matchRoutes.forEach((item) => router.addRoute('main', item))
      // 跳到新页面
      router.push('/main')
    },
    // 退出登录
    LogoutStore() {
      this.userInfo = {}
      this.userMenu = []
      localStorage.removeItem(LOGIN_TOKEN)
      localStorage.removeItem(USER_MENU)
    },
    // 记住账号
    memoryAccountStore(account: IAccount) {
      localStorage.setItem(LOGIN_MEMORY, JSON.stringify(account))
      localStorage.setItem(IS_CHECK, JSON.stringify(true))
    },
    // 不记住密码
    removeAccountStore() {
      localStorage.removeItem(LOGIN_MEMORY)
      localStorage.setItem(IS_CHECK, JSON.stringify(false))
    },
    // 刷新页面重新添加动态路由防止路由消失,在main.ts调用
    loadlocalStorageAction() {
      const token = localStorage.getItem(LOGIN_TOKEN)
      if (token && this.userInfo && this.userMenu) {
        //拿到用户所拥有的路由进行遍历添加到路由上形成可访问路由
        const matchRoutes = matchRoute(this.userMenu)
        matchRoutes.forEach((item) => router.addRoute('main', item))
      }
    }
  }
})
export default useLoginStore
