<template>
  <div class="postarea px-3" v-if="!processing">
    <div class="d-flex justify-content-end mb-3">
      <button
        class="btn bg-white d-flex align-items-center px-3"
        @click="$emit('close', false)"
      >
        <fa-icon :icon="['fas', 'xmark']"></fa-icon>
        <div class="ms-2">Close</div>
      </button>
    </div>
    <div v-if="reply">
      <!-- <timeline-record :record="reply" /> -->
      <div class="border rounded mb-2 p-1 bg-white">
        {{ reply.post.record.text }}
      </div>
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
          accept="image/*"
          multiple
          max="4"
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
  <div v-else>
    <spinner />
  </div>
</template>

<script lang="ts">
import { AppBskyEmbedImages } from '@atproto/api'
import Vue from 'vue'
import PostCounter from './PostCounter.vue'
// import Spinner from '~/components/Spinner.vue'
import pica from 'pica'

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
  props: {
    reply: {},
  },
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
      if (this.images.length >= 4) return
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
          if (this.images.length >= 4) {
            this.$store.commit('addToast', {
              message: '画像は4枚まで登録可能です',
              status: 'error',
            })
            return
          }
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
    async getResizedAndCompressedBlob(
      blob: Blob,
      maxWidth: number,
      maxHeight: number,
      mimeType: string,
      maxSize: number
    ): Promise<Blob> {
      const img = await this.blobToImage(blob)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const resizedDimensions = this.getResizedDimensions(
        img.width,
        img.height,
        maxWidth,
        maxHeight
      )
      canvas.width = resizedDimensions.width
      canvas.height = resizedDimensions.height

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      )

      let quality = 1.0
      let resizedBlob = await pica().toBlob(canvas, mimeType, quality)

      while (resizedBlob.size > maxSize && quality > 0) {
        quality -= 0.05
        resizedBlob = await pica().toBlob(canvas, mimeType, quality)
      }

      return resizedBlob
    },
    getResizedDimensions(
      width: number,
      height: number,
      maxWidth: number,
      maxHeight: number
    ): { width: number; height: number } {
      if (width <= maxWidth && height <= maxHeight) {
        return { width, height }
      }

      const aspectRatio = width / height

      if (width > height) {
        return { width: maxWidth, height: Math.round(maxWidth / aspectRatio) }
      } else {
        return { width: Math.round(maxHeight * aspectRatio), height: maxHeight }
      }
    },

    blobToImage(blob: Blob): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = URL.createObjectURL(blob)
        img.onload = () => {
          resolve(img)
        }
        img.onerror = (e) => {
          reject(new Error('Failed to load image.'))
        }
      })
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
      this.images.splice(index, 1)
    },
    postNote: async function () {
      try {
        let params: any = {
          text: this.post,
        }
        this.processing = true
        // this.$store.commit('setLoading', true)
        if (this.images.length > 0) {
          let embed: AppBskyEmbedImages.Main = {
            $type: 'app.bsky.embed.images',
            images: [],
          }
          embed.images = await Promise.all(
            this.images.map(async (image) => {
              const resizedImageBlob = await this.getResizedAndCompressedBlob(
                image.blob,
                2000,
                2000,
                'image/jpeg',
                970 * 1024
              ) // 970KB
              const res = await this.$atp.upImage(resizedImageBlob)
              if (!res) throw new Error('images up error.')
              return { image: res, alt: '' }
            })
          )
          params.embed = embed
        }
        if (this.reply) {
          params.reply = {
            root: {
              // @ts-ignore
              cid: this.reply.reply? this.reply.reply.root.cid: this.reply.post.cid,
              // @ts-ignore
              uri: this.reply.reply? this.reply.reply.root.uri: this.reply.post.uri,
            },
            parent: {
              // @ts-ignore
              cid: this.reply.post.cid,
              // @ts-ignore
              uri: this.reply.post.uri,
            },
          }
        }
        await this.$atp.post(params)
        this.post = ''
        this.$emit('close', true)
      } catch (e) {
        this.$store.commit('addToast', {
          message: '投稿に失敗しました',
          status: 'error',
        })
        console.log(e)
      } finally {
        this.processing = false
        // this.$store.commit('setLoading', false)
      }
    },
  },
  computed: {
    postButtonDisabled: function (): boolean {
      return !this.post.trim() || this.processing || this.post.length > 256
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
