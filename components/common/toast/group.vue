<template>
  <div class="fixed-top">
    <transition-group name="slide-up" tag="div">
      <toast
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
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
    ...mapGetters(['notifications']),
  },
})
</script>
