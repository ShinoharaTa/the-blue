// import moment from 'moment'
// import {
//   AppBskyEmbedExternal,
//   AppBskyEmbedImages,
//   AppBskyEmbedRecord,
//   AtpAgent,
//   AtpSessionData,
// } from '@atproto/api'

// const COOKIE_KEY = {
//   user_data: 'AozoraUserData',
//   service: 'AozoraService',
//   expire: 60 * 60 * 24 * 7,
// }

// export const state = () => ({
//   agent: null as AtpAgent | null,
//   me: {},
// })

// export type RootState = ReturnType<typeof state>

// export const mutations = {
//   setOverlay(state: RootState, value: boolean) {
//     state.overlay = value
//   },
//   setLightboxImages(
//     state: RootState,
//     params: { images: Array<Image> | null; page: number }
//   ) {
//     state.lightboxImages = params.images
//     console.log(params.page)
//   },
//   setLoading(state: RootState, status: boolean) {
//     state.loading = status
//   },
//   addToast(
//     state: RootState,
//     params: { message: string; status: string }
//   ) {
//     const created = moment().format('HHmmss') + moment().milliseconds()
//     state.toasts.push({
//       message: params.message,
//       status: params.status,
//       id: created,
//     })
//   },
//   removeToast(state: RootState, params: { id: string }) {
//     const index = state.toasts.findIndex(
//       (t) => t.id === params.id
//     )
//     if (index !== -1) {
//       state.toasts.splice(index, 1)
//     }
//   },
// }

// export const actions = {
//   initialize: function ({ commit, $cookies }: { commit: Function, $cookies: any }) {
//     const service = $cookies.get(COOKIE_KEY.service);
//     commit("setAgent", () => {
//       return new AtpAgent({
//         service: 'https://' + (service ? service : 'bsky.social'),
//         persistSession: (evt, sess) => {
//           $cookies.set(COOKIE_KEY.user_data, sess, {
//             maxAge: COOKIE_KEY.expire,
//           })
//         },
//       })
//     })
//   },
//   hasSession: async function ({ commit, $cookies, state }: { commit: Function, $cookies: any, state: RootState }) {
//     const session = (() => {
//       try {
//         const sessStr: AtpSessionData = $cookies.get(COOKIE_KEY.user_data)
//         return sessStr ? sessStr : null
//       } catch (error) {
//         console.log("session:", error)
//         return null
//       }
//     })()
//     if (!session) {
//       return { success: false }
//     }
//     if (!state.agent) return;
//     const { success, data } = await state.agent.resumeSession(session)
//     commit("setSelf", success ? data : null);
//     return;
//   },
// }

// export const getters = {
//   overlayView: (state: RootState) => state.overlay,
//   lightboxImages: (state: RootState) => state.lightboxImages,
//   toasts: (state: RootState) => state.toasts,
//   loading: (state: RootState) => state.loading,
// }
