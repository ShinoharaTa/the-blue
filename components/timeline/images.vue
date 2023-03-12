<template>
  <div class="row g-1">
    <template v-if="images.length === 1">
      <div class="col">
        <img
          :src="images[0].thumb"
          class="img_cover img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
    </template>
    <template v-if="images.length === 2">
      <div class="col">
        <img
          :src="images[0].thumb"
          class="img_cover2 img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
      <div class="col">
        <img
          :src="images[1].thumb"
          class="img_cover2 img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
    </template>
    <template v-if="images.length === 3">
      <div class="col">
        <img
          :src="images[0].thumb"
          class="img_cover2 img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
      <div class="col">
        <div class="row g-1">
          <div class="col-12">
            <img
              :src="images[1].thumb"
              class="img_cover img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
            />
          </div>
          <div class="col-12">
            <img
              :src="images[2].thumb"
              class="img_cover img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-if="images.length === 4">
      <div class="col-6">
        <img
          :src="images[0].thumb"
          class="img_cover img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
      <div class="col-6">
        <img
          :src="images[1].thumb"
          class="img_cover img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
      <div class="col-6">
        <img
          :src="images[2].thumb"
          class="img_cover img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
      <div class="col-6">
        <img
          :src="images[3].thumb"
          class="img_cover img-fluid"
          @click="setLightboxImages({ images: images, page: 0 })"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  props: {
    images: [],
  },
  computed: {
    // count :function () {
    //   return this.images.length
    // }
  },
  methods: {
    ...mapMutations({
      setLightboxImages: 'setLightboxImages',
    }),
  },
})
</script>

<style scoped>
.img_cover {
  object-fit: cover;
  aspect-ratio: 16 / 10;
}

.img_cover2 {
  object-fit: cover;
  aspect-ratio: 8 / 10;
  height: 100%;
}
</style>
