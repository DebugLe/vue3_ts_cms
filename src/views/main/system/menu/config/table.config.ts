const tableConfig = {
  moduleName: 'menu',
  title: '菜单列表',
  addBtnText: '新增菜单',
  tableColumn: [
    {
      type: 'text',
      prop: 'name',
      label: '菜单名称',
      width: '150',
      align: 'center'
    },
    {
      type: 'text',
      prop: 'type',
      label: '级别',
      width: '150',
      align: 'center'
    },
    {
      type: 'text',
      prop: 'url',
      label: '菜单url',
      align: 'center',
      slotName: 'testOne'
    },
    {
      type: 'text',
      prop: 'icon',
      label: '菜单icon',
      align: 'center',
      slotName: 'testOne'
    },
    {
      type: 'text',
      prop: 'sort',
      label: '排序',
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
