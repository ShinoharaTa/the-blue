<template>
  <div class="image-layout" :class="layoutClass">
    <div v-for="(image, index) in images" :key="index" class="image-wrapper">
      <div class="image">
        <img
          :src="image.thumb"
          class="object-cover"
          @click="setLightboxImages({ images: images, page: 1 })"
        />
      </div>
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
.image-layout {
  display: grid;
  grid-gap: 0.2rem;
  width: 100%;
  /* padding-bottom: 62.5%; */
  position: relative;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 62.5%;
}

.image-wrapper .object-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.layout-1 {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}

.layout-2 {
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
}

.layout-3 {
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}

.layout-4 {
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
}

.layout-3 .image-wrapper:nth-child(1) {
  grid-row: 1 / 3;
}
</style>
