const searchConfig = {
  moduleName: 'role',
  formItem: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
      style: 'width: 100%'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍',
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
