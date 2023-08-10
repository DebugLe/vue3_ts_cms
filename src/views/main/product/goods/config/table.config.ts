const tableConfig = {
  moduleName: 'goods',
  title: '商品列表',
  addBtnText: '新增商品',
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
      label: '商品名称',
      width: '100',
      align: 'center'
    },
    {
      type: 'text',
      prop: 'oldPrice',
      label: '原价格',
      width: '100',
      align: 'center'
    },
    {
      type: 'text',
      prop: 'newPrice',
      label: '现价格',
      width: '100',
      align: 'center'
    },
    {
      type: 'slot',
      prop: 'imgUrl',
      label: '商品图片',
      width: '100',
      align: 'center',
      slotName: 'imgSlot'
    },
    {
      type: 'tag',
      prop: 'status',
      label: '状态',
      width: '100',
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
