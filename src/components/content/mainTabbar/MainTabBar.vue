<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="deeppink">
      <img slot="item-icon" src="../assets/img/tabbar/首页.svg" alt="">
      <img slot="item-icon-active" src="../assets/img/tabbar/首页active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" active-color="deeppink">
      <img slot="item-icon" src="../assets/img/tabbar/发现.svg" alt="">
      <img slot="item-icon-active" src="../assets/img/tabbar/发现active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" active-color="deeppink">
      <img slot="item-icon" src="../assets/img/tabbar/创作.svg" alt="">
      <img slot="item-icon-active" src="../assets/img/tabbar/创作active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" active-color="deeppink">
      <img slot="item-icon" src="../assets/img/tabbar/我的.svg" alt="">
      <img slot="item-icon-active" src="../assets/img/tabbar/我的active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
    import TabBar from "../components/tabbar/TabBar";
    import TabBarItem from "../components/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
      components:{
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
