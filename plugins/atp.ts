import { Plugin } from '@nuxt/types'

import { AtpAgent, AtpSessionData } from '@atproto/api'
const SES_LOCAL_STORAGE_KEY = 'sess'

const agent = new AtpAgent({
  service: 'https://bsky.social',
  persistSession: (evt, sess) => {
    localStorage.setItem(SES_LOCAL_STORAGE_KEY, JSON.stringify(sess))
  },
})
// let self = null

// createSession: async function (identifier, password) {
//   try {
//     const { success, data } = await agent.login({
//       identifier: identifier,
//       password: password,
//     })
//     // if (success) {
//     //   self = data
//     // }
//     return { success }
//   } catch {
//     return { success: false }
//   }
// },

const atp = {
  login: async (identifier: string, password: string) => {
    try {
      const {success, data} = await agent.login({ identifier: identifier, password: password })
      return success ? data : null;
    } catch {
      return null;
    }
  },
}

const plugin: Plugin = (context, inject) => {
  inject("atp", atp)
}

export default plugin
