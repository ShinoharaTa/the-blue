<template>
  <div class="row g-1">
    <template v-if="images.length === 1">
      <div class="col">
        <img :src="images[0].thumb" class="img_cover img-fluid" />
      </div>
    </template>
    <template v-if="images.length === 2">
      <div class="col">
        <img :src="images[0].thumb" class="img_cover2 img-fluid" />
      </div>
      <div class="col">
        <img :src="images[1].thumb" class="img_cover2 img-fluid" />
      </div>
    </template>
    <template v-if="images.length === 3">
      <div class="col">
        <img :src="images[0].thumb" class="img_cover2 img-fluid" />
      </div>
      <div class="col">
        <div class="row g-1">
          <div class="col-12">
            <img :src="images[1].thumb" class="img_cover img-fluid" />
          </div>
          <div class="col-12">
            <img :src="images[2].thumb" class="img_cover img-fluid" />
          </div>
        </div>
      </div>
    </template>
    <template v-if="images.length === 4">
      <div class="col-6">
        <img :src="images[0].thumb" class="img_cover img-fluid" />
      </div>
      <div class="col-6">
        <img :src="images[1].thumb" class="img_cover img-fluid" />
      </div>
      <div class="col-6">
        <img :src="images[2].thumb" class="img_cover img-fluid" />
      </div>
      <div class="col-6">
        <img :src="images[3].thumb" class="img_cover img-fluid" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    images: [],
  },
  computed: {
    // count :function () {
    //   return this.images.length
    // }
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
  height: 100%;
}
</style>
