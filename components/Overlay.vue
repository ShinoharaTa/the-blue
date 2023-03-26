<template>
  <div class="page fixed-top" :class="centered">
    <div class="content flex-fill">
      <div class="d-flex justify-content-end px-3" v-if="close">
        <button
          class="btn bg-white d-flex align-items-center px-3"
          @click="closeAction"
        >
          <fa-icon :icon="['fas', 'xmark']"></fa-icon>
          <div class="ms-2">Close</div>
        </button>
      </div>
      <div class="mt-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    close: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: null,
    },
  },
  data() {
    return {}
  },
  beforeMount() {},
  methods: {
    closeAction: function () {
      this.$emit('close')
    },
  },
  beforeDestroy() {},
  computed: {
    centered: function () {
      return this.position ? this.position : 'center'
    },
  },
})
</script>

<style scoped>
.page {
  background-color: #cccb;
  backdrop-filter: saturate(180%) blur(4px);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 5000;
}

.center {
  align-items: center;
}

.content {
  max-width: 640px;
}
</style>
