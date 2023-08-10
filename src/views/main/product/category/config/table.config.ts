const tableConfig = {
  moduleName: 'category',
  title: '类别列表',
  addBtnText: '新增类别',
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
      label: '类别名称',
      width: '150',
      align: 'center'
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
