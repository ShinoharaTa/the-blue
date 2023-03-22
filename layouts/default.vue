<template>
  <div>
    <header-outline>
      <button class="btn btn-theme-outline" type="submit" @click="getTimeline(100)">
        <fa-icon :icon="['fas', 'arrows-rotate']" />
        Reload
      </button>
    </header-outline>
    <Nuxt />
    <div class="p-5"></div>
    <footer-outline @postClick="post = true"></footer-outline>
    <overlay v-if="showLightBox" :close="true" @close="closeLightBox()">
      <lightbox></lightbox>
    </overlay>
    <overlay v-if="post" :close="true" @close="post = false">
      <postarea @close="posted"></postarea>
    </overlay>
    <div class="fixed-top">
      <transition-group name="slide-up" tag="div">
        <toast
          v-for="notify in notifications"
          :key="notify.id"
          :message="notify.message"
          :status="notify.status"
          :id="notify.id"
          @remove="removeNotification"
        ></toast>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderOutline from '~/components/HeaderOutline.vue'
import Overlay from '~/components/Overlay.vue'
import Postarea from '~/components/Postarea.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Lightbox from '~/components/Lightbox.vue'
import Toast from '~/components/Toast.vue'

export default Vue.extend({
  components: { HeaderOutline, Postarea, Overlay, Lightbox, Toast },
  data() {
    return {
      timeline: [] as Array<any>,
      post: false as boolean,
      notifications: [] as Array<any>,
    }
  },
  async beforeMount() {
    await this.$atp.hasSession()
    await this.getTimeline()
  },
  created() {
    setInterval(() => {
      // this.getTimeline(100);
    }, 15000)
  },
  methods: {
    ...mapMutations({
      setLightboxImages: 'setLightboxImages',
    }),
    getTimeline: async function (limit = 100) {
      let data = await this.$atp.getTimeline({ limit: limit })
      if (data) {
        console.log(data)
        this.timeline = data.feed
      } else {
        this.$router.push('/login')
      }
    },
    singleReload: async function (uri: string) {
      const res = await this.$atp.getPost({ uri: uri })
      const index = this.timeline.findIndex((note) => note.post.uri === res.uri)
      this.timeline[index].post = Object.assign({}, res)
    },
    checkNewPost: async function () {},
    closeLightBox: function () {
      this.setLightboxImages({ images: null, page: 0 })
    },
    posted: function (result: any) {
      if (result) {
        this.addNotification('投稿しました', 'success')
      } else {
        this.addNotification('投稿できませんでした', 'error')
      }
      this.post = false
      console.log(result)
    },
    addNotification(message: string, status: string) {
      let created =
        this.$moment().format('HHmmss') + this.$moment().milliseconds()
      this.notifications.push({
        message: message,
        status: status,
        id: created,
      })
    },
    removeNotification(id: string) {
      let index = this.notifications.find((notify) => notify.id === id)
      this.notifications.splice(index, 1)
    },
  },
  computed: {
    ...mapGetters({
      overlayView: 'overlayView',
      lightboxImages: 'lightboxImages',
    }),
    showLightBox: function (): boolean {
      return !!this.lightboxImages
    },
  },
})
</script>

<style scoped>
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
