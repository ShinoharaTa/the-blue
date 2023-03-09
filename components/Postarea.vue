<template>
  <div class="fixed-bottom postarea pt-3">
    <div class="d-flex p-2">
      <div class="flex-fill p-1 textarea">
        <textarea rows="3" class="w-100" v-model="post"></textarea>
      </div>
      <button
        @click="postNote()"
        class="ms-2 btn btn-theme"
        :disabled="!postButtonDisabled"
      >
        <fa-icon :icon="['fas', 'rocket']"/>
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
      this.processing = true;
      await this.$atp.post(this.post)
      this.post = "";
      this.processing = false;
    },
    postButtonDisabled: function () {
      return !!this.post || this.processing
    },
  },
})
</script>

<style scoped>
.postarea {
  backdrop-filter: saturate(20%) blur(10px);
  background-color: #fffa;
  /* border-radius: 20px 20px 0 0; */
}

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

textarea:focus {
  /* border: 2px solid #00A3A6; */
}
</style>
