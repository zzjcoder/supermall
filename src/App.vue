<template>
  <div id="app">
<!--    keep-alive缓存页面，不会销毁 有keep-alive才能使用 activated，deactivated这两个函数-->
<!--    exclude排除Detail的keep-alive效果-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
