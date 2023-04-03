<template>
  <div class="row g-1">
    <div v-for="(image, index) in images" :key="index" class="col-3">
      <img
        :src="image.thumb"
        class="object-cover"
        @click="setLightboxImages({ images: images, page: 1 })"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  props: {
    images: [],
  },
  computed: {
    layoutClass() {
      // @ts-ignore
      return `layout-${this.images.length}`
    },
  },
  methods: {
    ...mapMutations({
      setLightboxImages: 'setLightboxImages',
    }),
  },
})
</script>

<style scoped>
.object-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 7px;
}
</style>
