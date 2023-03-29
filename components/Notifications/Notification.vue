<template>
  <div class="d-flex px-3">
    <div class="py-2 flex-fill">
      <div class="d-flex">
        <div :class="item.type" class="me-2 py-1 px-1 minimal">
          <fa-icon :icon="['fas', 'retweet']" class="fa-fw" />
        </div>
        <div>
          <div class="d-flex">
            <div
              class="icon me-2"
              v-for="author in item.author.slice(0, 5)"
              :key="author.did"
            >
              <img :src="author.avatar" class="img-fluid" alt="" />
            </div>
            <div class="icon me-2" v-if="item.author.length === 6">
              <img :src="item.author[5].avatar" class="img-fluid" alt="" />
            </div>
            <div class="icon me-2" v-if="item.author.length > 6">
              <div class="icon bg-light">more</div>
            </div>
          </div>
          <div class="mt-1 text-break minimal">
            <span v-for="(author, index) in displayAuthors" :key="index">
              <template v-if="index === 2 && item.author.length > 3">
                <span>他{{ item.author.length - 2 }}人</span>
              </template>
              <template v-else>
                <span class="display-name">{{ author.displayName }}</span
                >さん
              </template>
              <span v-if="index < displayAuthors.length - 1">、</span>
            </span>
            <span v-if="item.type === 'vote'">がふぁぼりました</span>
            <span v-else-if="item.type === 'repost'">がリポりました</span>
          </div>
        </div>
      </div>
      <div class="repost__outline mt-1">
        <div class="outline text-break" v-if="record">
          <div class="mt-1" v-html="replaceText"></div>
        </div>
      </div>
      <!-- {{ item }} -->
    </div>
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
  async beforeMount() {
    try {
      this.record = await this.$atp.getPost({
        uri: this.item.record.subject.uri,
      })
    } catch (error) {}
    console.log(this.record)
  },
  computed: {
    displayAuthors() {
      return this.item.author.length > 3 ? this.item.author.slice(0, 3) : this.item.author;
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
        // .replace(regex, (url: string) => {
        //   const shortUrl = url.length > 32 ? url.slice(0, 32) + '...' : url
        //   return ` <a href="${url}">${shortUrl}</a> `
        // })
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
  width: 32px;
  height: 32px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  font-weight: 600;
}

.minimal {
  font-size: 0.8rem;
}

.vote {
  color: #e2943b;
  background-color: #e2943b40;
  border-radius: 7px;
}

.repost {
  color: #7ba23f;
  background-color: #7ba23f40;
  border-radius: 7px;
}

.display-name {
  /* font-family: 'strong'; */
  font-weight: 600;
}

.outline {
  padding: 0.2rem 0.5rem 0.5rem;
  font-size: 0.8rem;
}
</style>
