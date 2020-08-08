<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "HomeSwiper",
    components: {
		  Swiper,
      SwiperItem
    },
    props: {
		  banners: {
		    type: Array,
        default(){
		      return[]
        }
      }
    },
    data() {
		  return{
		    isLoad:false
      }
    },
    methods: {
		  stopTimer() {
		    this.$refs.swiper.stopTimer()
      },
      startTimer() {
		    if (this.$refs.swiper) {
          this.$refs.swiper.startTimer()
        }
      },
      imageLoad() {
		    if (!this.isLoad) {
          // console.log('-----');
          this.$emit('swiperImageLoad')
          this.isLoad = true
          // 为了不让HomeSwiper多次发出事件，只需要一次所以用isLoad记录状态
        }
      }
    }
	}
</script>

<style scoped>

</style>
