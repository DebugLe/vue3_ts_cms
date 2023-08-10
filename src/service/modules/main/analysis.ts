import hyRequest from '../../'

//获取商品各个总量
export const reqGetAmountList = () => {
  return hyRequest.request({
    url: '/goods/amount/list',
    method: 'GET'
  })
}
//获取分类商品数量(饼图)
export const reqGetGoodsCategoryCount = () => {
  return hyRequest.request({
    url: '/goods/category/count',
    method: 'GET'
  })
}
//获取折线图数据
export const reqGetGoodsCategorySale = () => {
  return hyRequest.request({
    url: '/goods/category/sale',
    method: 'GET'
  })
}
//获取柱状图数据
export const reqGetGoodsCategoryFavor = () => {
  return hyRequest.request({
    url: '/goods/category/favor',
    method: 'GET'
  })
}
//获取地图数据
export const reqGetGoodsAddressSale = () => {
  return hyRequest.request({
    url: '/goods/address/sale',
    method: 'GET'
  })
}
