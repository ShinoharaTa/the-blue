import moment from 'moment'
// https://qiita.com/shindex/items/a90217b9e4c03c5b5215

import {
  getAccessorType,
  actionTree,
  mutationTree,
  getterTree,
} from 'typed-vuex'

export const state = () => ({
  overlay: false as Boolean,
  lightboxImages: null as Array<Image> | null,
  notifications: [] as Array<Toast>,
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  overlayView: (state) => state.overlay,
  lightboxImages: (state) => state.lightboxImages,
  notifications: (state) => state.notifications,
})

export const mutations = {
  setOverlay(state: RootState, value: boolean) {
    state.overlay = value
  },
  setLightboxImages(
    state: RootState,
    params: { images: Array<Image> | null; page: number }
  ) {
    state.lightboxImages = params.images
    console.log(params.page)
  },
  addNotification(
    state: RootState,
    params: { message: string; status: string }
  ) {
    let created = moment().format('HHmmss') + moment().milliseconds()
    state.notifications.push({
      message: params.message,
      status: params.status,
      id: created,
    })
  },
  removeNotification(state: RootState, params: { id: string }) {
    const index = state.notifications.findIndex(
      (notify) => notify.id === params.id
    )
    if (index !== -1) {
      state.notifications.splice(index, 1)
    }
  },
}
export const actions = actionTree(
  { state, getters, mutations },
  {
    getTimeline({ commit }) {
      // this.app.$atp.getTimeline(){
      // }
    },
  }
)
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // import したサブモジュールはここに記述します。
    // age,
  },
})
