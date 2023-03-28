<template>
  <div class="mt-3">
    {{ item.reason }}
    <img :src="item.author.avatar" class="w-25 img-fluid" alt="">
    {{ item }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    item: {
      default: {},
    },
    post: {
      default: {}
    }
  },
})
</script>

