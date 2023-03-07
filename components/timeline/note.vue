<template>
  <div class="d-flex px-2 mb-3">
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
        <repost :reaction="note.post.repostCount" :action="!!note.post.viewer.repost" />
        <favorite :reaction="note.post.upvoteCount" :action="!!note.post.viewer.upvote" />
      </div>
      <div>
        {{ note }}
      </div>
    </div>
  </div>
</template>

<script>
import comment from '@/components/icons/comment.vue'
import repost from '@/components/icons/repost.vue'
import favorite from '@/components/icons/favorite.vue'

export default {
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
  },
}
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
