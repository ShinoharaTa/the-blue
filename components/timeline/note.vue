<template>
  <div class="">
    <div v-if="repost" class="repost">
      <font-awesome-icon :icon="['fas', 'retweet']" class="" />
      <span>reposted by </span>
      <span class="username">{{repost.by.displayName}}</span>
    </div>
    <div class="d-flex">
      <img :src="note.post.author.avatar" class="img-fluid icon" />
      <div class="ms-2 flex-fill">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <span class="display-name">
              {{ note.post.author.displayName }}
            </span>
            <span>
              {{ note.post.author.handle }}
            </span>
          </div>
          <div>now</div>
        </div>
        <div class="">
          <div v-html="urlReplaceText"></div>
        </div>
        <div class="d-flex align-items-center">
          <comment :reaction="note.post.replyCount" />
          <repost
            :reaction="note.post.repostCount"
            :action="!!note.post.viewer.repost"
          />
          <favorite
            :reaction="note.post.upvoteCount"
            :action="!!note.post.viewer.upvote"
          />
        </div>
        <div>
          {{ note }}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="ts">
import Vue from 'vue'
import comment from '@/components/icons/comment.vue'
import repost from '@/components/icons/repost.vue'
import favorite from '@/components/icons/favorite.vue'

export default Vue.extend({
  components: {
    comment,
    repost,
    favorite,
  },
  props: {
    note: {},
  },
  computed: {
    urlReplaceText: function () {
      const text = this.note.post.record.text
      const regex = /(https?:\/\/[^\s]+)/g
      const processedText = text.replace(regex, (url) => {
        const shortUrl = url.length > 20 ? url.slice(0, 20) + '...' : url
        return ` <a href="${url}">${shortUrl}</a> `
      })
      return processedText
    },
    repost: function () {
      return this.note.reason ?? null;
    }
  },
})
</script>

<style scoped>
.icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.display-name {
  font-family: 'strong';
}
</style>
