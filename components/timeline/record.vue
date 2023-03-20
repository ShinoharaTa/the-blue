<template>
  <div class="outline text-break">
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
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  props: {
    record: {} as Object,
  },
  computed: {
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
      return this.$moment(this.record.record.createdAt).format("YYYY/MM/DD HH:mm")
    },
  },
  methods: {
    ...mapMutations({
      setLightboxImages: 'setLightboxImages',
    }),
  },
})
</script>

<style scoped>
.icon {
  width: 32px;
  height: 32px;
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

.outline {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
}
</style>
