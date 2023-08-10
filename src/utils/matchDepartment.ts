import useSystemStore from '@/stores/modules/main/system'
const systemStore = useSystemStore()

//匹配部门
export function matchDepartment(parentId: string) {
  for (const item of systemStore.moduleList) {
    if (item.id === parentId) {
      return item.name
    }
  }
}
