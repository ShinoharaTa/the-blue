<template>
  <div class="postarea px-3">
    <div class="textarea">
      <textarea
        rows="9"
        class="w-100"
        v-model="post"
        :disabled="processing"
      ></textarea>
    </div>
    <div class="d-flex p-2 justify-content-between align-items-center">
      <button></button>
      <div class="d-flex">
        <post-counter :text="post" class=""></post-counter>
        <button
          @click="postNote()"
          class="ms-2 btn btn-primary"
          :disabled="postButtonDisabled"
        >
          <fa-icon :icon="['fas', 'rocket']" class="fa-fw" />
          Lift off
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostCounter from './PostCounter.vue'

interface VueData {
  post: string
  processing: boolean
}

export default Vue.extend({
  components: { PostCounter },
  data(): VueData {
    return {
      post: '',
      processing: false,
    }
  },
  methods: {
    postNote: async function () {
      this.processing = true
      let str = this.post
      this.post = ''
      await this.$atp.post(str)
      this.processing = false
      this.$emit('close', true)
    },
  },
  computed: {
    postButtonDisabled: function () {
      return !this.post.trim() || this.processing
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
