<template >
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <!--    <swiper>-->
      <!--      <swiper-item v-for="item in banners">-->
      <!--        <a :href="item.link">-->
      <!--          <img :src="item.image" alt="">-->
      <!--        </a>-->
      <!--      </swiper-item>-->
      <!--    </swiper>-->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view ></feature-view>
      <tab-control class="tab-control"
                   @itemClick="tabClick"
                   :titles="['流行', '新款', '精选']"></tab-control>
      <!--    <goods-list :goodsList="goodsList[currentType].list"></goods-list>-->
      <goods-list :goodsList="showGoodsList"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeData} from "network/home";


  // import Swiper from "components/common/swiper/Swiper";
  // import SwiperItem from "components/common/swiper/SwiperItem";
  // import {Swiper,SwiperItem} from "components/common/swiper";

  export default {
    name: "Home",
    components: {

      // Swiper,
      // SwiperItem,
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      GoodsListItem,
      Scroll,
      BackTop
    },
    data(){
      return{
        // result:null
        banners:[],
        recommends:[],
        goodsList: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType:'pop',
        isShowBackTop:false,
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeData('pop')
      this.getHomeData('new')
      this.getHomeData('sell')
    },
    computed: {
      showGoodsList() {
        return this.goodsList[this.currentType].list
      }
    },
    methods:{
      /**
       * 以下事件监听相关的
       */
      loadMore(){
        // console.log('上拉加载更多');
        this.getHomeData(this.currentType)

        this.$refs.scroll.scroll.refresh()  //刷新，防止bug
      },

      contentScroll(position){
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },

      backClick(){
        console.log('回到顶部');
        this.$refs.scroll.scroll.scrollTo(0,0,1000);
        // this.$refs.scroll.scrollTo(0,0);
        // console.log(this.$refs.scroll.message);
        this.$refs.scroll.message
        // this.$emit('backClick')
      },

      tabClick(index){
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      /**
       * 以下网络请求相关的
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res)
          // this.result = res
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeData(type){
        const page = this.goodsList[type].page + 1
        getHomeData(type,page).then(res => {
          // console.log(res)
          this.goodsList[type].list.push(...res.data.list)
          this.goodsList[type].page += 1

          this.$refs.scroll.scroll.finishPullUp()//无封装
          // this.$refs.scroll.finishPullUp()//有封装
        })
        // getHomeData(type, this.goodsList[type].page).then(res => {
        //   const goodsList = res.data.list;
        //   this.goodsList[type].list.push(...goodsList)
        //   this.goodsList[type].page += 1
        //
        //   this.$refs.scroll.finishPullUp()
        // })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    padding-bottom: 48px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /*z-index: 9;*/
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  /*.content {*/
  /*  height: calc(100%);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
