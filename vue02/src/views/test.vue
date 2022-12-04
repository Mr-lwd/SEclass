<template>
  <swiper
    :modules="modules"
    :loop="true"
    :slides-per-view="1"
    :space-between="50"
    :autoplay="{ delay: 4000, disableOnInteraction: false }"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
  >
    <!-- loop可循环轮播，autoplay可自动播放 -->
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper>

</template>

<script>
// 引入swiper组件
import { Swiper, SwiperSlide } from 'swiper/vue'
// 引入swiper样式（按需导入）
import 'swiper/css'
import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
import 'swiper/css/scrollbar'  // 轮播图的滚动条
// 引入swiper核心和所需模块
import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper'
// 在modules加入要使用的模块
const modules = [Autoplay, Pagination, Navigation, Scrollbar]

export default {
  name: "test",
  components:{
    Swiper,
    SwiperSlide,
    Autoplay,
    Pagination,
    Navigation,
    Scrollbar
  }
};
</script>

<style scoped>

</style>
