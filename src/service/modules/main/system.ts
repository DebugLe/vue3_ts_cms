import hyRequest from '../..'

// 查询用户列表
export const reqPostUserList = (data: any) => {
  return hyRequest.request({
    url: '/users/list',
    data,
    method: 'POST'
  })
}

// 删除用户
export const reqDeleteUser = (userId: number) => {
  return hyRequest.request({
    url: `/users/${userId}`,
    method: 'DELETE'
  })
}

// 增加用户
export const reqPostAddUser = (data: any) => {
  return hyRequest.request({
    url: '/users',
    method: 'POST',
    data
  })
}

// 编辑用户
export const reqPatchEditUser = (userId: number, data: any) => {
  return hyRequest.request({
    url: `/users/${userId}`,
    method: 'PATCH',
    data
  })
}

// 查询模块列表
export const reqPostModuleList = (moduleName: string, data: any) => {
  return hyRequest.request({
    url: `/${moduleName}/list`,
    data,
    method: 'POST'
  })
}
// 删除模块
export const reqDeleteModule = (moduleName: string, Id: number) => {
  return hyRequest.request({
    url: `/${moduleName}/${Id}`,
    method: 'DELETE'
  })
}

// 增加模块
export const reqPostAddModule = (moduleName: string, data: any) => {
  return hyRequest.request({
    url: `/${moduleName}`,
    method: 'POST',
    data
  })
}

// 编辑模块
export const reqPatchEditModule = (
  moduleName: string,
  Id: number,
  data: any
) => {
  return hyRequest.request({
    url: `/${moduleName}/${Id}`,
    method: 'PATCH',
    data
  })
}
