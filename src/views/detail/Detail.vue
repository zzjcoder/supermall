<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
<!--    scroll必须要有稳定的高度-->
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
<!--      <goods-list :goods="recommendList"></goods-list>-->
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailRecommendInfo from './childComps/DetailRecommendInfo';

  import Scroll from "components/common/scroll/Scroll";
  // import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      // GoodsList
    },
    data() {
      return {
        iid:null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid =  this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3.创建店铺信息
        this.shop = new Shop(data.shopInfo);
        //4.获取商品信息
        this.detailInfo = data.detailInfo
        //5.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //6.保存评论信息
        if (data.rate.list !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      })
      // 3.请求推荐数据
      getRecommend().then((res, error) => {
        console.log(res);
        // if (error) return
        this.recommendList = res.data.list
        console.log(res.data.list);
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    /*z-index: 9;*/
  }
</style>
