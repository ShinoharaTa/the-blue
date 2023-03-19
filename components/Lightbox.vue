<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="image in lightboxImages" :key="image.id">
        <div class="image-container">
          <img :src="image.fullsize" class="">
        </div>
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
    new Swiper('.swiper-container', {
      spaceBetween: 0, // スライド間のスペース
      loop: false, // ループさせるかどうか
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

<style scoped>
.image-container {
  max-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-height: 70vh;
  object-fit: contain;
}
</style>
