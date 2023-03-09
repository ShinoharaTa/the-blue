<template>
  <div>
    <header-outline>
      <button class="btn btn-theme-outline" type="submit" @click="getTimeline">
        <fa-icon :icon="['fas', 'arrows-rotate']" />
        Reload
      </button>
    </header-outline>
    <timeline-note :note="note" v-for="note in timeline" :key="note.cid" />
    <postarea @posted="getTimeline" />
    <!-- {{ timeline }} -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderOutline from '~/components/HeaderOutline.vue'
import Postarea from '~/components/Postarea.vue'

interface VueData {
  timeline: Array<Object>
}

export default Vue.extend({
  components: { HeaderOutline, Postarea },
  data(): VueData {
    return {
      timeline: [],
    }
  },
  async beforeMount() {
    await this.$atp.hasSession()
    await this.getTimeline()
  },
  methods: {
    getTimeline: async function () {
      let data = await this.$atp.getTimeline({ limit: 100 })
      if (data) {
        console.log(data)
        this.timeline = data.feed
      } else {
        this.$router.push('/login')
      }
    },
    checkNewPost: async function () {},
  },
})
</script>
