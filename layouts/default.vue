<template>
  <div>
    <Nuxt />
    <div class="p-5"></div>
    <footer-outline @postClick="post = true"></footer-outline>
    <overlay v-if="showLightBox" :close="true" @close="closeLightBox()">
      <lightbox></lightbox>
    </overlay>
    <toast-group />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderOutline from '~/components/HeaderOutline.vue'
import Overlay from '~/components/Overlay.vue'
import Postarea from '~/components/Postarea.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Lightbox from '~/components/Lightbox.vue'
import ToastGroup from '~/components/common/toast/group.vue'

export default Vue.extend({
  components: { HeaderOutline, Postarea, Overlay, Lightbox, ToastGroup },
  data() {
    return {
      timeline: [] as Array<any>,
      post: false as boolean,
    }
  },
  methods: {
    ...mapMutations({
      setLightboxImages: 'setLightboxImages',
    }),
    closeLightBox: function () {
      this.setLightboxImages({ images: null, page: 0 })
    },
  },
  computed: {
    ...mapGetters({
      overlayView: 'overlayView',
      lightboxImages: 'lightboxImages',
    }),
    showLightBox: function (): boolean {
      return !!this.lightboxImages
    },
  },
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
