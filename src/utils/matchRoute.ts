// 匹配角色所拥有的路由

import type { RouteRecordRaw } from 'vue-router'

//遍历所有本地路由
function localRouting() {
  // 本地路由添加到localRoutes数组
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
//遍历出当前可用的路由,用作动态路由
export function matchRoute(userMenus: any[]) {
  const localRoutes = localRouting()
  const matchRoutes: RouteRecordRaw[] = []
  // 拿到当前角色所拥有的路由遍历到最深层次
  for (const firstLevel of userMenus) {
    // 所有本地路由进行过滤，找出与当前角色相同的一级路径
    const currentfirstRoute = localRoutes.find(
      (item) => item.path == firstLevel.url
    )
    if (currentfirstRoute) matchRoutes.push(currentfirstRoute)
    for (const secondLevel of firstLevel.children) {
      // 所有本地路由进行过滤，找出与当前角色相同的二级路径
      const currentsecondRoute = localRoutes.find(
        (item) => item.path == secondLevel.url
      )
      if (currentsecondRoute) matchRoutes.push(currentsecondRoute)
    }
  }
  // 抛出动态路由路径
  return matchRoutes
}
//遍历出面包屑
export function mapBreadCrumbs(path: string, userMenus: any[]) {
  //通过传入的当前所在路径和菜单中的路径匹配拿到对应菜单的一级路径、名称和二级路径、名称
  const currentCrumbs: any[] = []
  for (const firstLevel of userMenus) {
    for (const secondLevel of firstLevel.children) {
      if (secondLevel.url === path) {
        currentCrumbs.push({ name: firstLevel.name, path: firstLevel.url })
        currentCrumbs.push({ name: secondLevel.name, path: secondLevel.url })
      }
    }
  }
  return currentCrumbs
}
// 遍历出可用按钮,动态按钮
export function mapButtonPermissions(menuLists: any[]) {
  const permission: string[] = []
  function recursion(menuLists: any[]) {
    for (const item of menuLists) {
      if (item.type === 3) {
        permission.push(item.permission)
      } else {
        recursion(item.children || [])
      }
    }
  }
  recursion(menuLists)
  return permission
}
