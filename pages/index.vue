<template>
  <div>
    <button @click="getTimeline">更新</button>
    <timeline-note :note="note" v-for="note in timeline" :key="note.cid" />
    <!-- {{ timeline }} -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface VueData {
  timeline: Array<Object>
}

export default Vue.extend({
  data(): VueData {
    return {
      timeline: [],
    }
  },
  beforeMount() {
    this.getTimeline({ limit: 100 })
  },
  methods: {
    getTimeline: async function () {
      let data = await this.$atp.getTimeline({ limit: 100 })
      if (data){
        console.log(data)
        this.timeline = data.feed
      }
      else {
        this.$router.push("/login");
      }
    },
  },
})
</script>
