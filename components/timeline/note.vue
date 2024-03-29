<template>
  <div class="pb-2">
    <div v-if="isRepost" class="repost px-3 py-1 bg-light">
      <fa-icon :icon="['fas', 'retweet']" class="" />
      <span>reposted by </span>
      <span class="username">{{ isRepost.by.displayName }}</span>
    </div>
    <div class="d-flex px-3 mt-1 outline">
      <div class="flex-shrink-0">
        <img :src="note.post.author.avatar" class="img-fluid icon mt-1" />
      </div>
      <div class="ms-2 flex-fill">
        <div class="d-flex align-items-center justify-content-between">
          <div class="name-handle">
            <span class="display-name me-2">
              {{ note.post.author.displayName }}
            </span>
            <span>
              {{ note.post.author.handle }}
            </span>
          </div>
          <div class="set-time flex-shrink-0">{{ timeString }}</div>
        </div>
        <div v-if="!!note.reply" class="mt-1 d-flex">
          <div class="replyed">
            <fa-icon :icon="['fas', 'reply']" class="me-1" />Replyed to:
            <span class="display-name">{{
              note.reply.parent.author.displayName
            }}</span>
          </div>
        </div>
        <div class="mt-1">
          <div v-html="replaceText" class="text-break"></div>
        </div>
        <div v-if="images" class="image__outline mt-2">
          <common-images :images="images" />
        </div>
        <div v-if="record" class="repost__outline mt-2">
          <timeline-record :record="record" />
        </div>
        <div class="d-flex align-items-center">
          <comment :reaction="note.post.replyCount" @reply="$emit('reply')" />
          <repost
            :reaction-count="note.post.repostCount"
            :is-active="!!note.post.viewer.repost"
            :post-uri="note.post.uri"
            :post-cid="note.post.cid"
            @reload="$emit('reload', note.post.uri)"
          />
          <favorite
            :reaction-count="note.post.likeCount"
            :is-active="!!note.post.viewer.like"
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
import CommonImages from '@/components/common/images/fullsize.vue'

export default Vue.extend({
  components: {
    comment,
    repost,
    favorite,
    CommonImages,
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
      let embed = null
      if (
        this.note.post.embed?.$type === 'app.bsky.embed.recordWithMedia#view'
      ) {
        embed = this.note.post.embed.media.images
      } else if (this.note.post.embed?.$type === 'app.bsky.embed.images#view') {
        embed = this.note.post.embed.images
      }
      return embed
    },
    record: function () {
      let embed = null
      if (
        this.note.post.embed?.$type === 'app.bsky.embed.recordWithMedia#view'
      ) {
        embed = this.note.post.embed.record.record
      } else if (this.note.post.embed?.$type === 'app.bsky.embed.record#view') {
        embed = this.note.post.embed.record
      }
      return embed
    },
    isRepost: function () {
      return this.note.reason ?? null
    },
    timeString: function () {
      return this.$moment(this.note.post.indexedAt).fromNow()
    },
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
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
}

.display-name {
  /* font-family: 'strong'; */
  font-weight: 600;
}

.set-time {
  font-size: 0.8rem;
}

.outline {
  max-width: 100vw;
}

.replyed {
  font-size: 0.75rem;
  padding: 0.2rem 1rem;
  background: #eee;
  border-radius: 1rem;
}
</style>
