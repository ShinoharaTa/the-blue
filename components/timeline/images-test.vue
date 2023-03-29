<template>
  <div class="image-gallery-container">
    <div v-if="images.length === 1" class="full-width">
      <img :src="images[0]" alt="Image 1">
    </div>
    <div v-else-if="images.length === 2" class="half-width">
      <img :src="images[0]" alt="Image 1">
      <img :src="images[1]" alt="Image 2">
    </div>
    <div v-else-if="images.length === 3" class="half-width">
      <div class="full-width">
        <img :src="images[0]" alt="Image 1">
      </div>
      <div class="half-width">
        <img :src="images[1]" alt="Image 2">
        <img :src="images[2]" alt="Image 3">
      </div>
    </div>
    <div v-else-if="images.length === 4" class="half-width">
      <div class="half-width">
        <img :src="images[0]" alt="Image 1">
        <img :src="images[1]" alt="Image 2">
      </div>
      <div class="half-width">
        <img :src="images[2]" alt="Image 3">
        <img :src="images[3]" alt="Image 4">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.image-gallery-container {
  width: 100%;
  height: 0;
  padding-top: 62.5%; /* 16:10 aspect ratio */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.full-width {
  width: 100%;
  height: 100%;
}

.half-width {
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
