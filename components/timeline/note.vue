<template>
  <div class="">
    <div v-if="isRepost" class="repost px-3 py-1 bg-light">
      <fa-icon :icon="['fas', 'retweet']" class="" />
      <span>reposted by </span>
      <span class="username">{{ isRepost.by.displayName }}</span>
    </div>
    <div class="d-flex px-3 mt-1 outline">
      <img :src="note.post.author.avatar" class="img-fluid icon mt-1" />
      <div class="ms-2 flex-fill">
        <div class="d-flex align-items-center justify-content-between">
          <div class="name-handle">
            <span class="display-name">
              {{ note.post.author.displayName }}
            </span>
            <span>
              {{ note.post.author.handle }}
            </span>
          </div>
          <div class="set-time flex-shrink-0">{{ timeString }}</div>
        </div>
        <div class="mt-1">
          <div v-html="replaceText"></div>
        </div>
        <div v-if="images" class="image__outline mt-2">
          <timeline-images :images="images" />
        </div>
        <div class="d-flex align-items-center">
          <comment :reaction="note.post.replyCount" />
          <repost
            :reaction-count="note.post.repostCount"
            :is-active="!!note.post.viewer.repost"
            :post-uri="note.post.uri"
            :post-cid="note.post.cid"
            @reload="$emit('reload', note.post.uri)"
          />
          <favorite
            :reaction-count="note.post.upvoteCount"
            :is-active="!!note.post.viewer.upvote"
            :post-uri="note.post.uri"
            :post-cid="note.post.cid"
            @reload="$emit('reload', note.post.uri)"
          />
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
      default: () => {},
    },
  },
  methods: {
    repost: function (post: any) {
      this.$atp.repost({ uri: post.uri, cid: post.cid })
    },
  },
  computed: {
    replaceText: function () {
      const text = this.note.post.record.text
      const regex = /(https?:\/\/[^\s]+)/g
      const processedText = text
        .replace(/[<>"'&]/g, (match: string) => {
          switch (match) {
            case '<':
              return '&lt;'
            case '>':
              return '&gt;'
            case '"':
              return '&quot;'
            case "'":
              return '&#39;'
            case '&':
              return '&amp;'
          }
          return match
        })
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
      this.replaceText.replace(regex, (match: string) => {
        images.push(match)
      })
      return images
    },
    images: function () {
      return this.note.post.embed?.images ?? null
    },
    isRepost: function () {
      return this.note.reason ?? null
    },
    timeString: function () {
      return this.$moment(this.note.post.record.createdAt).fromNow()
    }
  },
})
</script>

<style scoped>
.icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.name-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.display-name {
  /* font-family: 'strong'; */
  font-weight: 600;
}

.set-time {
  font-size: 0.8rem
}

.outline {
  max-width: 100vw;
}
</style>
