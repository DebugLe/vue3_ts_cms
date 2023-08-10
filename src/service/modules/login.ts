import hyRequest from '..'
import type { IAccount } from '@/types'

// 账号登录校验
export const reqGetUserInfo = (data: IAccount) => {
  return hyRequest.request({
    url: '/login',
    data,
    method: 'POST'
  })
}

// 获取用户详细信息
export const reqGetUserDetailedInfo = (id: number) => {
  return hyRequest.request({
    url: `/users/${id}`,
    method: 'GET'
  })
}

// 获取用户菜单
export const reqGetUserMenu = (id: number) => {
  return hyRequest.request({
    url: `/role/${id}/menu`,
    method: 'GET'
  })
}
