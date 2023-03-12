<template>
  <div class="fixed-bottom glass pt-3">
    <div class="d-flex p-2">
      <div class="flex-fill p-1 textarea">
        <textarea rows="3" class="w-100" v-model="post"></textarea>
      </div>
      <button
        @click="postNote()"
        class="ms-2 btn btn-primary"
        :disabled="postButtonDisabled"
      >
        <fa-icon :icon="['fas', 'rocket']" />
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
</style>
