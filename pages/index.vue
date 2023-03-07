<template>
  <div>
    <button @click="getTimeline">更新</button>
    <div>
      <textarea cols="30" rows="5" v-model="post"></textarea>
      <button @click="postNote()">投稿</button>
    </div>
    <timeline-note :note="note" v-for="note in timeline" :key="note.cid" />
    <!-- {{ timeline }} -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface VueData {
  timeline: Array<Object>
  post: string
}

export default Vue.extend({
  data(): VueData {
    return {
      timeline: [],
      post: "しのさんテスト文言"
    }
  },
  async beforeMount() {
    await this.$atp.hasSession();
    await this.getTimeline()
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
    checkNewPost: async function () {

    },
    postNote: async function() {
        this.$atp.post(this.post);
    }
  },
})
</script>
