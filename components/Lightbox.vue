<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="image in lightboxImages" :key="image.id">
        <img :src="image.fullsize" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  mounted() {
    const mySwiper = new Swiper('.swiper-container', {
      spaceBetween: 0, // スライド間のスペース
      loop: true, // ループさせるかどうか
      pagination: {
        el: '.swiper-pagination', // ページネーションのセレクタ
        clickable: true, // クリックできるようにする
      },
      navigation: {
        prevEl: '.swiper-button-prev', // 前へボタンのセレクタ
        nextEl: '.swiper-button-next', // 次へボタンのセレクタ
      },
      slidesPerView: 'auto',
      centeredSlides: true,
    })
  },
  computed: {
    ...mapGetters({
      overlayView: 'overlayView',
      lightboxImages: 'lightboxImages',
    }),
  },
}
</script>

<style>
.swiper-slide img {
}
</style>
