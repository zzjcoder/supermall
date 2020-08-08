<template >
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control @itemClick="tabClick"
                 :titles="['流行', '新款', '精选']"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed "></tab-control>
    <scroll class=" content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--    <swiper>-->
      <!--      <swiper-item v-for="item in banners">-->
      <!--        <a :href="item.link">-->
      <!--          <img :src="item.image" alt="">-->
      <!--        </a>-->
      <!--      </swiper-item>-->
      <!--    </swiper>-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view ></feature-view>
      <tab-control @itemClick="tabClick"
                   :titles="['流行', '新款', '精选']"
                   ref="tabControl2"></tab-control>
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
  import {debounce} from "common/utils";

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
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY: 0,
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
    mounted() {
      // 1.图片加载完的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('itemImageLoad',() => {
        // this.debounce(this.$refs.scroll.refresh,500)
        refresh()
        // this.$refs.scroll.refresh() // 直接调用refresh会执行30 次，很频繁
        // console.log('----');
      })


    },
    methods:{
      // 防抖debounce ，解决refresh非常频繁刷新的问题 已经将这个方法抽到common里的utils
      // debounce(func, delay) {
      //   let timer = null
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },

      /**
       * 以下事件监听相关的
       */
      swiperImageLoad(){ //这个方法是为了获取滚动到多少时开始吸顶效果
        // 获取tabContorl的offsetTop
        // 所有组件都有一个属性$el：用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      loadMore(){
        // console.log('上拉加载更多');
        this.getHomeData(this.currentType)

        // this.$refs.scroll.scroll.refresh()  //刷新，防止bug
      },

      contentScroll(position){
        // console.log(position);
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 2.决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      /**
       * 以下网络请求相关的
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          console.log(res)
          // this.result = res
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeData(type){
        const page = this.goodsList[type].page + 1
        getHomeData(type,page).then(res => {
          console.log(res)
          console.log(res.data.list)
          this.goodsList[type].list.push(...res.data.list)
          this.goodsList[type].page += 1

          // 完成上拉加载更多
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
    },
    computed: {
      showGoodsList() {
        return this.goodsList[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)

    },
    deactivated() {
      console.log(this.$refs.scroll.scroll.y);
      this.saveY = this.$refs.scroll.scroll.y
    },
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    padding-bottom: 48px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*}*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  /*.fixed {*/
  /*  position: fixed;*/
  /*  top: 44px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/
  .tab-control {
    position: relative;
  }

  /*.content {*/
  /*  height: calc(100%);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
