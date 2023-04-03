<template>
  <div>
    <div class="max-width mx-auto">
      <notification
        v-for="notification in notifications"
        :key="notification.id"
        :item="notification"
      >
      </notification>
    </div>
  </div>
</template>

<script lang="ts">
import { Autoplay } from 'swiper'
import Vue from 'vue'
import Notification from '~/components/Notifications/Notification.vue'

interface Notifications {
  [key: string]: any;
}

export default Vue.extend({
  components: {
    Notification,
  },
  data() {
    return {
      notifications: {} as Notifications,
      cursor: null,
    }
  },
  async beforeMount() {
    await this.$atp.hasSession()
    await this.getNotification()
  },
  created() {
    setInterval(() => {
    }, 15000)
  },
  methods: {
    getNotification: async function (limit = 100) {
      let data = await this.$atp.getNotifications()
      if (data) {
        console.log(data)
        this.notifications = {}
        data.notifications.forEach((item: any) => {
          if (item.reason === 'like' || item.reason === 'repost') {
            // console.log(item)
            const cid = item.record.subject.cid
            const type = item.reason
            const record = item.record
            const author = item.author
            const keyName = cid + '_' + type
            if(!(keyName in this.notifications)){
              this.notifications[keyName] = {
                cid: cid,
                type: type,
                record: record,
                author: [],
              }
            }
            this.notifications[keyName].author.push(author)
          } else if (item.reason === 'reply') {
            const cid = item.record.reply.parent.cid
            const type = item.reason
            const record = item.record
            const author = item.author
            const keyName = cid + '_' + type + '_' + item.cid
            if(!(keyName in this.notifications)){
              this.notifications[keyName] = {
                cid: cid,
                type: type,
                record: record,
                author: [],
              }
            }
            this.notifications[keyName].author.push(author)
          } else {
            // console.log(item)
          }
        })
        this.cursor = data.cursor
      } else {
        this.$router.push('/login')
      }
    },
  },
})
</script>

<style scoped></style>
