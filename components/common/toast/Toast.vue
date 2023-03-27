<template>
  <div class="mx-auto my-2">
    <div class="mx-3 infomation glass" :class="notification.status">
      {{ notification.message }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  props: {
    notification: {
      type: Object as () => Toast,
      required: true,
      default: {
        id: '',
        message: '',
        status: '',
      },
    },
  },
  methods: {},
  created() {
    setInterval(() => {
      this.$store.commit('removeNotification', { id: this.notification.id })
    }, 3000)
  },
})
</script>

<style scoped>
.infomation {
  padding: 8px 15px;
  border-radius: 8px;
  background-color: #fffc;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 5px 0px rgba(128, 128, 128, 0.25);
}

.warning {
  color: #e2943b;
  border: 1px solid #e2943b;
}

.error {
  color: #db4d6d;
  border: 1px solid #db4d6d;
}

.success {
  color: #1b813e;
  border: 1px solid #1b813e;
}

.info {
  color: #1e88a8;
  border: 1px solid #1e88a8;
}
</style>
