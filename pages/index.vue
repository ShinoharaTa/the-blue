<template>
  <div>
    <header-outline>
      <button class="btn btn-theme-outline" type="submit" @click="getTimeline">
        <fa-icon :icon="['fas', 'arrows-rotate']" />
        Reload
      </button>
    </header-outline>
    <div class="d-flex justify-content-center">
      <div class="max-width">
        <timeline-note
          :note="note"
          v-for="note in timeline"
          :key="note.id"
          @reload="singleReload(note.post.uri)"
        />
      </div>
    </div>
    <div class="p-5"></div>
    <!-- <postarea @posted="getTimeline" /> -->
    <footer-outline @postClick="post = true"></footer-outline>
    <overlay v-if="showLightBox" :close="true" @close="closeLightBox()">
      <lightbox></lightbox>
    </overlay>
    <overlay v-if="post" :close="true" @close="post = false">
      <postarea></postarea>
    </overlay>
    <!-- {{ timeline }} -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderOutline from '~/components/HeaderOutline.vue'
import Overlay from '~/components/Overlay.vue'
import Postarea from '~/components/Postarea.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Lightbox from '~/components/Lightbox.vue'

// interface VueData {
//   timeline: Array<Object>
//   post: Boolean
// }

export default Vue.extend({
  components: { HeaderOutline, Postarea, Overlay, Lightbox },
  data() {
    return {
      timeline: [] as Array<any>,
      post: false as boolean,
    }
  },
  async beforeMount() {
    await this.$atp.hasSession()
    await this.getTimeline()
  },
  created() {
    setInterval(() => {
      // this.getTimeline();
    }, 3000)
  },
  methods: {
    ...mapMutations({
      setLightboxImages: 'setLightboxImages',
    }),
    getTimeline: async function () {
      let data = await this.$atp.getTimeline({ limit: 100 })
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
