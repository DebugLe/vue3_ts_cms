const tableConfig = {
  moduleName: 'role',
  title: '角色列表',
  addBtnText: '新增角色',
  tableColumn: [
    {
      type: 'selection'
    },
    {
      type: 'index'
    },
    {
      type: 'text',
      prop: 'name',
      label: '角色名称',
      width: '150',
      align: 'center'
    },
    {
      type: 'text',
      prop: 'intro',
      label: '角色描述',
      width: '150',
      align: 'center'
    },
    {
      type: 'slot',
      prop: 'name',
      label: '自定义插槽',
      align: 'center',
      slotName: 'testOne'
    },
    {
      type: 'time',
      prop: 'createAt',
      label: '创建时间',
      align: 'center'
    },
    {
      type: 'time',
      prop: 'uploadAt',
      label: '更新时间',
      align: 'center'
    }
  ]
}
export default tableConfig
