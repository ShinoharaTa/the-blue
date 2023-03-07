<template>
  <div class="note__reaction">
    <font-awesome-icon :icon="faIcon.icon" :class="faIcon.css" />
    <span>{{ reaction }}</span>
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
    reaction: {
      type: Number,
      default: 0,
    },
    action: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    faIcon: function () {
      let result: iconType = {
        icon: ['far', 'star'],
        css: [],
      }
      console.log(this.action)
      if (this.action) {
        result.css.push('active')
      }
      return result
    },
  },
})
</script>

<style scoped>
.active {
  color: #00ff00;
}
</style>
