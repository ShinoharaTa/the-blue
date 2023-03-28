<template>
  <div class="mt-3">
    <div class="d-flex">
      <div v-if="item.type === 'vote'" class="icon me-2 vote">
        <fa-icon :icon="['fas', 'star']" class="fa-fw" />
      </div>
      <div v-if="item.type === 'repost'" class="icon me-2 repost">
        <fa-icon :icon="['fas', 'retweet']" class="fa-fw" />
      </div>
      <div class="icon me-2" v-for="author in item.author" :key="author.did">
        <img :src="author.avatar" class="img-fluid" alt="" />
      </div>
    </div>
    <div class="mt-2">{{ authorNames }}</div>
    <div class="outline text-break" v-if="record">
      <div class="d-flex">
        <div class="flex-shrink-0">
          <img :src="record.author.avatar" class="img-fluid icon mt-1" />
        </div>
        <div class="ms-2 flex-fill">
          <div class="name-handle">
            <span class="display-name me-2">
              {{ record.author.displayName }}
            </span>
            <span>
              {{ record.author.handle }}
            </span>
          </div>
          <div class="">{{ timeString }}</div>
        </div>
      </div>
      <div class="mt-1">{{ replaceText }}</div>
      <!-- {{ record }} -->
    </div>

    {{ item }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    item: {
      default: {},
    },
    post: {
      default: null,
    },
  },
  data() {
    return {
      record: null,
    }
  },
  async beforeMount () {
    // this.record = 
    await this.$atp.getPost(this.item.record.subject.uri)
  },
  computed: {
    authorNames: function () {
      let text: string = ''
      if (this.item.author.length > 3) {
        text += this.item.author[0].displayName + 'さん、'
        text += this.item.author[1].displayName + 'さん、'
        text += '他' + (this.item.author.length - 2) + '人'
      } else if (this.item.author.length == 3) {
        text += this.item.author[0].displayName + 'さん、'
        text += this.item.author[1].displayName + 'さん、'
        text += this.item.author[2].displayName + 'さん'
      } else if (this.item.author.length == 2) {
        text += this.item.author[0].displayName + 'さん、'
        text += this.item.author[1].displayName + 'さん'
      } else if (this.item.author.length == 1) {
        text += this.item.author[0].displayName + 'さん'
      }
      if (this.item.type === 'vote') {
        text += 'がふぁぼりました'
      } else if (this.item.type === 'repost') {
        text += 'がリポりました'
      }
      return text
    },
    replaceText: function () {
      const text = this.record.record.text
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
    timeString: function () {
      return this.$moment(this.record.record.createdAt).format(
        'YYYY/MM/DD HH:mm'
      )
    },
  },
})
</script>

<style scoped>
.icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.vote {
  color: #e2943b;
  background-color: #e2943b40;
}

.repost {
  color: #7ba23f;
  background-color: #7ba23f40;
}
</style>
