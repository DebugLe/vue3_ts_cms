import { defineStore } from 'pinia'
import {
  reqGetAmountList,
  reqGetGoodsCategoryCount,
  reqGetGoodsCategorySale,
  reqGetGoodsCategoryFavor,
  reqGetGoodsAddressSale
} from '@/service/modules/main/analysis'

interface IState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    //获取商品各个总量
    async getAmountList() {
      const amountRes = await reqGetAmountList()
      this.amountList = amountRes.data.data
    },
    //获取分类商品数量(饼图)
    async getGoodsCategoryCount() {
      const categoryCountRes = await reqGetGoodsCategoryCount()
      this.goodsCategoryCount = categoryCountRes.data.data
    },
    //获取折线图数据
    async getGoodsCategorySale() {
      const categorySaleRes = await reqGetGoodsCategorySale()
      this.goodsCategorySale = categorySaleRes.data.data
    },
    //获取柱状图数据
    async getGoodsCategoryFavor() {
      const categoryFavorRes = await reqGetGoodsCategoryFavor()
      this.goodsCategoryFavor = categoryFavorRes.data.data
    },
    //获取地图数据
    async getGoodsAddressSale() {
      const addressSaleRes = await reqGetGoodsAddressSale()
      this.goodsAddressSale = addressSaleRes.data.data
    }
  }
})
export default useAnalysisStore
