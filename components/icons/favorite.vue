<template>
  <button
    class="note__reaction"
    :class="{ 'button-active': isActive }"
    @click="buttonClick"
  >
    <fa-icon :icon="faIcon.icon" :class="faIcon.css" class="fa-fw" />
    <span>{{ reactionCount }}</span>
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
    reactionCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    postUri: {
      type: String,
      default: '',
    },
    postCid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      process: false as Boolean,
    }
  },
  methods: {
    buttonClick: async function () {
      this.process = true
      await this.$atp.upvote({ uri: this.postUri, cid: this.postCid })
      this.$emit('reload')
      this.process = false
    },
  },
  computed: {
    faIcon: function () {
      let result: iconType = {
        icon: ['far', 'star'],
        css: [],
      }
      if (this.process) {
        result.icon = ['fas', 'arrows-rotate']
        result.css.push('fa-spin')
      }
      if (this.isActive) {
        result.icon = ['fas', 'star']
        result.css.push('active')
      }
      return result
    },
  },
})
</script>

<style scoped>
.active {
  color: #e2943b;
}

.button-active {
  background-color: #e2943b40;
  border-radius: 4px;
}
</style>
