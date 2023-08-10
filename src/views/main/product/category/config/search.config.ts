const searchConfig = {
  moduleName: 'category',
  formItem: [
    {
      type: 'input',
      label: '类别名称',
      prop: 'name',
      placeholder: '请输入类别名称',
      style: 'width: 100%'
    },
    {
      type: 'picker',
      label: '创建时间',
      prop: 'createAt',
      placeholder: '请输入查询的部门领导',
      rangeSeparator: '-',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      style: 'width: 100%'
    }
  ]
}
export default searchConfig
