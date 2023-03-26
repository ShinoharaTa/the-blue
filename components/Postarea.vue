<template>
  <div class="postarea px-3">
    <div class="d-flex justify-content-end mb-3">
      <button
        class="btn bg-white d-flex align-items-center px-3"
        @click="$emit('close', false)"
      >
        <fa-icon :icon="['fas', 'xmark']"></fa-icon>
        <div class="ms-2">Close</div>
      </button>
    </div>
    <div class="textarea">
      <textarea
        rows="9"
        class="w-100"
        v-model="post"
        :disabled="processing"
        @paste="handlePaste"
      ></textarea>
    </div>
    <div class="mt-2">
      <div class="row g-1">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="col-3 image-outline"
        >
          <img
            :src="image.dataUrl"
            :alt="'画像' + (index + 1)"
            class="add-image"
          />
          <button @click="removeImage(index)" class="btn bg-white remove-image">
            <fa-icon :icon="['fas', 'xmark']" class="fa-fw"></fa-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div>
        <input
          type="file"
          ref="fileInput"
          @change="onFileChange"
          style="display: none"
        />
        <button @click="inputImages" class="btn bg-white">
          <fa-icon :icon="['far', 'image']" class="fa-fw text-theme"></fa-icon>
          {{ images.length }} / 4
        </button>
      </div>
      <div class="d-flex">
        <post-counter :text="post" class=""></post-counter>
        <button
          @click="postNote()"
          class="ms-2 btn btn-theme"
          :disabled="postButtonDisabled"
        >
          <fa-icon :icon="['fas', 'rocket']" class="fa-fw" />
          Lift off
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AppBskyEmbedImages } from '@atproto/api'
import Vue from 'vue'
import PostCounter from './PostCounter.vue'

interface image {
  blob: Blob
  dataUrl: String
}

interface VueData {
  post: string
  processing: boolean
  images: Array<image>
}

export default Vue.extend({
  components: { PostCounter },
  data(): VueData {
    return {
      post: '',
      processing: false,
      images: [],
    }
  },
  methods: {
    inputImages() {
      ;(this.$refs.fileInput as HTMLInputElement).click()
    },
    onFileChange(event: Event) {
      const files = (event.target as HTMLInputElement).files
      if (!files) return
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type.startsWith('image/')) {
          this.addImage(file)
        }
      }
    },
    async handlePaste(event: ClipboardEvent) {
      const items = event.clipboardData!.items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const blob = items[i].getAsFile() as Blob
          await this.addImage(blob)
          break
        }
      }
    },
    async addImage(blob: Blob) {
      const dataUrl = await this.readFileAsDataURL(blob)
      this.images.push({ blob, dataUrl })
    },
    readFileAsDataURL(file: Blob) {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result as string)
        }
        reader.onerror = () => {
          reject(reader.error)
        }
        reader.readAsDataURL(file)
      })
    },
    removeImage(index: number) {
      this.images.splice(index, 1);
    },
    postNote: async function () {
      try {
        let params: any = {
          text: this.post,
        }
        this.processing = true
        if (this.images.length > 0) {
          let embed: AppBskyEmbedImages.Main = {
            $type: 'app.bsky.embed.images',
            images: [],
          }
          embed.images = await Promise.all(
            this.images.map(async (image) => {
              const res = await this.$atp.upImage(image.blob)
              if (!res) throw new Error('images up error.')
              return { image: res, alt: '' }
            })
          )
          params.embed = embed
        }
        await this.$atp.post(params)
        this.processing = false
        this.post = ''
        this.$emit('close', true)
      } catch (e) {
        console.log(e)
      }
    },
  },
  computed: {
    postButtonDisabled: function () {
      return !this.post.trim() || this.processing
    },
  },
})
</script>

<style scoped>
.textarea {
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  background-color: #fff;
}

textarea {
  border: none;
  font-size: 16px;
  box-sizing: border-box;
  display: block;
}

.postarea {
  max-width: 640px;
  width: 100%;
}

.add-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.image-outline {
  position: relative;
}

.remove-image {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0.3rem;
  right: 0.3rem;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
