<template>
  <div class="postarea">
    <div class="textarea">
      <textarea rows="10" class="w-100" v-model="post"></textarea>
    </div>
    <div class="d-flex p-2 justify-content-between align-items-center">
      <button></button>
      <button
        @click="postNote()"
        class="ms-2 btn btn-primary"
        :disabled="postButtonDisabled"
      >
        <fa-icon :icon="['fas', 'rocket']" />
        Lift off
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface VueData {
  post: string
  processing: boolean
}

export default Vue.extend({
  data(): VueData {
    return {
      post: '',
      processing: false,
    }
  },
  methods: {
    postNote: async function () {
      this.processing = true
      await this.$atp.post(this.post)
      this.post = ''
      this.processing = false
    },
  },
  computed: {
    postButtonDisabled: function () {
      return !this.post || this.processing
    },
  },
})
</script>

<style scoped>
.textarea {
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  background-color: #fff;
}

textarea {
  border: none;
  font-size: 16px;
  box-sizing: border-box;
  display: block;
}

.postarea {
  max-width: 640px;
  width: 100%;
}
</style>
