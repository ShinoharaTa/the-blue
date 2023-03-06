import { Plugin, Context } from '@nuxt/types'
import { AtpAgent, AtpSessionData } from '@atproto/api'

const COOKIE_KEY = 'AozoraUserData'

export interface atProtoInterface {
  login(identifier: string, password: string): any
  getTimeline(params: { limit?: number; cursor?: string }): any
}

class atproto implements atProtoInterface {
  private agent: AtpAgent
  constructor(ctx: Context) {
    this.agent = new AtpAgent({
      service: 'https://bsky.social',
      persistSession: (evt, sess) => {
        // ctx.$cookies.set(COOKIE_KEY, JSON.stringify(sess), { maxAge: 60  *  60  *  24  *  7 });
        // localStorage.setItem(SES_LOCAL_STORAGE_KEY, JSON.stringify(sess))
      },
    })
  }

  async login(identifier: string, password: string) {
    try {
      const { success, data } = await this.agent.login({
        identifier: identifier,
        password: password,
      })
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
}

const atp: Plugin = (context: Context, inject) => {
  inject('atp', new atproto(context))
}

export default atp
