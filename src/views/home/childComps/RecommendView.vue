<template>
  <div class="recommend">
<!--    <a href="http://act.mogujie.com/zzlx67">-->
<!--      <img src="~assets/img/home/recommend_bg.jpg" alt="">-->
<!--    </a>-->
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
	export default {
		name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default(){
          return[]
        }
      }
    },
	}
</script>

<style scoped>
  .recommend img {
    width: 90%;
  }
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
  }
  .recommend-item{
    flex: 1;
  }
</style>
