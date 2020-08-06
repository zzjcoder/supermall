<template>
  <div class="goods">
    <goods-list-item v-for="item in goodsList" :goods-item="item"></goods-list-item>
  </div>
<!--  <grid-view>-->
<!--    <goods-list-item v-for="(item, index) in goodsList" :key="index" :goods="item"></goods-list-item>-->
<!--  </grid-view>-->
</template>

<script>
  // import GridView from 'common/gridView/GridView'
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      // GridView,
      GoodsListItem
    },
    props: {
      goodsList: {
        type: Array,
        // default: []
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  /*justify-content均等分 */
  }

</style>
