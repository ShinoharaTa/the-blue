import { Plugin, Context } from '@nuxt/types'
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AtpAgent,
  AtpSessionData,
} from '@atproto/api'
import { ReplyRef } from '@atproto/api/dist/client/types/app/bsky/feed/post'

const COOKIE_KEY = {
  user_data: 'AozoraUserData',
  service: 'AozoraService',
}

declare module 'vue/types/vue' {
  interface Vue {
    $atp: atProtoInterface
  }
}

declare module '@nuxt/types' {
  interface Context {
    $atp: typeof atproto
  }
}

class atproto implements atProtoInterface {
  private agent: AtpAgent
  private me: any
  private ctx
  constructor(ctx: Context) {
    this.ctx = ctx
    const service = this.ctx.app.$cookies.get(COOKIE_KEY.service)
    this.agent = new AtpAgent({
      service: 'https://' + (service ? service : 'bsky.social'),
      persistSession: (evt, sess) => {
        this.ctx.app.$cookies.set(COOKIE_KEY.user_data, sess, {
          maxAge: 60 * 60 * 24 * 7,
        })
      },
    })
    // this.ctx.app.$cookies.removeAll()
    // this.me = null
    // this.ctx.app.$router.push('/login')
  }

  async login(identifier: string, password: string, service: string) {
    try {
      const { success, data } = await this.agent.login({
        identifier: identifier,
        password: password,
      })
      this.me = data
      this.ctx.app.$cookies.set(COOKIE_KEY.service, service, {
        maxAge: 60 * 60 * 24 * 7,
      })
      return success ? data : null
    } catch {
      return null
    }
  }
  logout() {
    this.me = null
    this.ctx.app.$cookies.remove(COOKIE_KEY.service)
    this.ctx.app.$cookies.remove(COOKIE_KEY.user_data)
    return null
  }
  async hasSession() {
    const session = (() => {
      try {
        const sessStr: AtpSessionData = this.ctx.app.$cookies.get(
          COOKIE_KEY.user_data
        )
        // console.log(sessStr)
        if (!sessStr) {
          return null
        }
        return sessStr
      } catch {
        return null
      }
    })()
    if (!session) {
      return null;
    }

    const { success, data } = await this.agent.resumeSession(session)
    try {
      this.me = data
      return success ? data : null
    } catch {
      return null
    }
  }
  async getTimeline(params: { limit?: number; cursor?: string }) {
    try {
      const { success, data } = await this.agent.api.app.bsky.feed.getTimeline(
        params
      )
      return success ? data : null
    } catch {
      return null
    }
  }

  async getProfile(params: { actor: string }) {
    const response = await this.agent.api.app.bsky.actor.getProfile(params)
    // console.log(response);
    return response;
  }
  async getPost(params: { uri: string }) {
    const response = await this.getPostThread({ ...params, depth: 0 })
    if (!response?.thread.notFound) {
      return response?.thread.post
    } else {
      return null
    }
  }
  async getPostThread(params: { uri: string; depth?: number }) {
    const { success, data } = await this.agent.api.app.bsky.feed.getPostThread(
      params
    )
    return success ? data : null
  }
  async getNotifications() {
    const { success, data } =
      await this.agent.api.app.bsky.notification.listNotifications()
    if (!success) {
    }
    return { notifications: data.notifications, cursor: data.cursor }
  }

  async post(params: {
    text: string
    urls?: { url: string; indices: [number, number] }[]
    embed?:
    | AppBskyEmbedImages.Main
    | AppBskyEmbedExternal.Main
    | AppBskyEmbedRecord.Main
    | { $type: string;[k: string]: unknown }
    reply?: ReplyRef
  }) {
    return this.agent.api.app.bsky.feed.post.create(
      { repo: this.me.handle },
      {
        text: params.text,
        // entities: params.urls?.map(({ url, indices }) => ({
        //   type: 'link',
        //   index: {
        //     start: indices[0],
        //     end: indices[1],
        //   },
        //   value: url,
        // })),
        reply: params.reply,
        embed: params.embed,
        createdAt: new Date().toISOString(),
      }
    )
  }

  async upImage(image: Blob) {
    const { data, success } = await this.agent.api.com.atproto.repo.uploadBlob(
      new Uint8Array(await image.arrayBuffer()),
      { encoding: image.type }
    )
    console.log(data)
    if (!success) return null
    return data.blob
  }

  async repost(params: { uri: string; cid: string }) {
    let res = this.agent.api.app.bsky.feed.repost.create(
      { repo: this.me.handle },
      {
        subject: params,
        direction: 'up',
        createdAt: new Date().toISOString(),
      }
    )
    return res
  }

  async upvote(params: { uri: string; cid: string }) {
    let res = this.agent.api.app.bsky.feed.like.create(
      { repo: this.me.handle },
      {
        subject: params,
        direction: 'up',
        createdAt: new Date().toISOString(),
      }
    )
    return res
  }
}

const atp: Plugin = (context: Context, inject) => {
  const instance = new atproto(context) as atProtoInterface
  inject('atp', instance)
}

export default atp

export interface atProtoInterface {
  login(identifier: string, password: string, service: string): any
  logout(): void
  hasSession(): any
  getTimeline(params: { limit?: number; cursor?: string }): any
  getProfile(params: { actor: string }): any
  getPost(params: { uri: string }): any
  getPostThread(params: { uri: string; depth?: number }): any
  getNotifications(): any
  post(params: {
    text: string
    urls?: { url: string; indices: [number, number] }[]
    embed?:
    | AppBskyEmbedImages.Main
    | AppBskyEmbedExternal.Main
    | AppBskyEmbedRecord.Main
    | { $type: string;[k: string]: unknown }
  }): any
  upImage(image: Blob): any
  repost(params: { uri: string; cid: string }): any
  upvote(params: { uri: string; cid: string }): any
}
