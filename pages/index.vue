<template>
  <div>
    <header-outline>
      <button class="btn btn-theme-outline" type="submit" @click="getTimeline(100)">
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
    <overlay v-if="post" :close="true" @close="post = false">
      <postarea @close="posted"></postarea>
    </overlay>
  </div>
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
  },
})
</script>
