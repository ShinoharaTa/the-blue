<template>
  <div class="">
    <div v-if="repost" class="repost">
      <font-awesome-icon :icon="['fas', 'retweet']" class="" />
      <span>reposted by </span>
      <span class="username">{{ repost.by.displayName }}</span>
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
          <div>{{ $moment(note.post.record.createdAt).fromNow() }}</div>
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
        <div v-if="images" class="image__outline">
          <timeline-images :images="images" />
        </div>
        <div>
          <!-- {{ note }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import comment from '@/components/icons/comment.vue'
import repost from '@/components/icons/repost.vue'
import favorite from '@/components/icons/favorite.vue'
import TimelineImages from '@/components/timeline/images.vue'

export default Vue.extend({
  components: {
    comment,
    repost,
    favorite,
    TimelineImages,
  },
  props: {
    note: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    urlReplaceText: function () {
      const text = this.note.post.record.text
      const regex = /(https?:\/\/[^\s]+)/g
      const processedText = text
        .replace(regex, (url: string) => {
          const shortUrl = url.length > 32 ? url.slice(0, 32) + '...' : url
          return ` <a href="${url}">${shortUrl}</a> `
        })
        .replace(/\n{3,}/g, '<br/><br/>')
        .replace(/\n/g, '<br/>')
      return processedText
    },
    getImagesFromUrl: function () {
      const regex = /(https?:\/\/[^\s]+\.(?:png|jpe?g|gif))/gi

      const images: Array<string> = []
      this.urlReplaceText.replace(regex, (match: string) => {
        images.push(match)
      })
      return images
    },
    images: function () {
      return this.note.post.embed?.images ?? null
    },
    repost: function () {
      return this.note.reason ?? null
    },
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
