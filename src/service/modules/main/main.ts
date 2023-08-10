import hyRequest from '../..'
// 获取角色列表
export const reqPostRoleList = () => {
  return hyRequest.request({
    url: '/role/list',
    method: 'POST',
    data: { offset: 0, size: 100 }
  })
}
// 获取部门列表
export const reqPostDepartmentList = () => {
  return hyRequest.request({
    url: '/department/list',
    method: 'POST',
    data: { offset: 0, size: 100 }
  })
}
// 获取完整菜单列表
export const reqPostCompleteMenuList = () => {
  return hyRequest.request({
    url: '/menu/list',
    method: 'POST'
  })
}
