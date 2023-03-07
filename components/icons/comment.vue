<template>
  <div class="note__reaction">
    <fa-icon :icon="faIcon.icon" :class="faIcon.css" />
    <span>{{ reply }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type iconType = {
  icon: Array<string>
  css: Array<string>
}

export default Vue.extend({
  props: {
    reply: {
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
