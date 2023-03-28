<template>
  <div>
    <!-- <header-outline>
      <button
        class="btn btn-theme-outline"
        type="submit"
        @click="getTimeline(100)"
      >
        <fa-icon :icon="['fas', 'arrows-rotate']" />
        Reload
      </button>
    </header-outline> -->
    <div class="max-width mx-auto">
      <!-- <note
        :note="note"
        v-for="note in timeline"
        :key="note.id"
        @reload="singleReload(note.post.uri)"
      /> -->
      <notification v-for="notification in notifications" :key="notification.id" :item="notification">
      </notification>
    </div>
    <div class="p-5"></div>
    <!-- <div class="fixed-bottom mb-5 pb-3">
      <div class="button-outline max-width mx-auto ios-padding">
        <div class="me-3 mb-3 write-button">
          <button class="post-icon btn-theme" @click="post = true">
            <fa-icon :icon="['fas', 'rocket']" class="fa-lg" />
          </button>
        </div>
      </div>
    </div> -->
    <!-- <overlay v-if="post" position="top">
      <postarea @close="close"></postarea>
    </overlay> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Notification from '~/components/Notifications/Notification.vue'

export default Vue.extend({
  components: {
    Notification
  },
  data() {
    return {
      notifications: null,
      cursor: null,
    }
  },
  async beforeMount() {
    await this.$atp.hasSession()
    await this.getNotification()
  },
  created() {
    setInterval(() => {
      // this.getTimeline(100);
    }, 15000)
  },
  methods: {
    getNotification: async function (limit = 100) {
      let data = await this.$atp.getNotifications()
      if (data) {
        console.log(data)
        this.notifications = data.notifications
        this.cursor = data.cursor
      } else {
        this.$router.push('/login')
      }
    },
  },
})
</script>

<style scoped>
</style>
