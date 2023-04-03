<template>
  <button class="note__reaction" @click="$emit('reply')">
    <fa-icon :icon="faIcon.icon" :class="faIcon.css" />
    <span>{{ reaction }}</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

type iconType = {
  icon: Array<string>
  css: Array<string>
}

export default Vue.extend({
  props: {
    reaction: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    faIcon: function () {
      let result: iconType = {
        icon: ['far', 'comment'],
        css: [],
      }
      return result
    },
  },
})
</script>

<style scoped>
</style>
