<template>
  <div class="note__reaction" @click="buttonClick">
    <fa-icon :icon="faIcon.icon" :class="faIcon.css" />
    <span>{{ reactionCount }}</span>
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
      default: "",
    },
    postCid: {
      type: String,
      default: "",
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
      await this.$atp.repost({ uri: this.postUri, cid: this.postCid })
      this.$emit("reload");
      this.process = false
    },
  },
  computed: {
    faIcon: function () {
      let result: iconType = {
        icon: ['fas', 'retweet'],
        css: [],
      }
      if (this.process) {
        result.icon = ['fas', 'arrows-rotate']
        result.css.push('fa-spin')
      }
      if (this.isActive) {
        result.css.push('active')
      }
      return result
    },
  },
})
</script>

<style scoped>
.active {
  color: #7BA23F;
}
</style>
