<template>
  <div>
    <header-outline>
      <button
        class="btn btn-theme-outline"
        type="submit"
        @click="getTimeline(100)"
      >
        <fa-icon :icon="['fas', 'arrows-rotate']" />
        Reload
      </button>
    </header-outline>
    <div class="max-width mx-auto">
      <note
        :note="note"
        v-for="note in timeline"
        :key="note.id"
        @reload="singleReload(note.post.uri)"
      />
    </div>
    <div class="p-5"></div>
    <div class="fixed-bottom mb-5 pb-3">
      <div class="button-outline max-width mx-auto">
        <div class="me-3 mb-3 write-button">
          <button class="post-icon btn-theme" @click="post = true">
            <fa-icon :icon="['fas', 'rocket']" class="fa-lg" />
          </button>
        </div>
      </div>
    </div>
    <overlay v-if="post">
      <postarea @close="close"></postarea>
    </overlay>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Note from '~/components/timeline/note.vue'

export default Vue.extend({
  components: { Note },
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
    close: function (result: any) {
      this.post = false
      if (result) {
        console.log(true)
      }
    },
  },
})
</script>

<style scoped>
.button-outline {
  position: relative;
}
.write-button {
  position: absolute;
  top: -1rem;
  right: 1.5rem;
  transform: translate(50%, -100%);
  -webkit-transform: translate(50%, -100%);
  -ms-transform: translate(50%, -100%);
}

.post-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
