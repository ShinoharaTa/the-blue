<template>
  <div class="fixed-top toast-group">
    <transition-group name="slide-up" tag="div">
      <toast
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
      ></toast>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Toast from "~/components/common/toast/Toast.vue"

export default Vue.extend({
  components: { Toast },
  computed: {
    ...mapGetters(['toasts']),
  },
})
</script>

<style scoped>
.toast-group {
  z-index: 9999;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
