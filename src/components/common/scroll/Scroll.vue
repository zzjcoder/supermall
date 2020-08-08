<template>
<!--  ref/children -> -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType:{
        type:Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message:'哈哈哈'
      }
    },
    mounted() {
      // 1.创建BScroll对象
      // this.scroll = new BScroll(document.querySelector(('.wrapper')))
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,//上拉加载更多
        click:true,
      })
      // 2.监听滚动的位置
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position) //发出事件
      })
      console.log(this.scroll)
      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          // console.log('上拉加载更多');
          this.$emit('pullingUp') //发出事件
          // 发送网络请求，请求更多页的数据

          // 等数据请求完成，并且将新的数据展示出来后
          // setTimeout(() => {
          //   bscroll.finishPullUp()
          // },2000)
        })
      }
    },
    methods:{
      scrollTo(x,y,time=300) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {

        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        // console.log('----');
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
