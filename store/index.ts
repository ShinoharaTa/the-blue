import moment from 'moment'
// https://qiita.com/shindex/items/a90217b9e4c03c5b5215

export const state = () => ({
  overlay: false as boolean,
  lightboxImages: null as Array<Image> | null,
  notifications: [] as Array<Toast>,
})

export type RootState = ReturnType<typeof state>

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
  addNotification(state: RootState, params: { message: string; status: string }) {
    const created = moment().format('HHmmss') + moment().milliseconds()
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

export const actions = {
  getTimeline({ commit }: { commit: Function }) {
    // this.app.$atp.getTimeline(){
    // }
  },
}

export const getters = {
  overlayView: (state: RootState) => state.overlay,
  lightboxImages: (state: RootState) => state.lightboxImages,
  notifications: (state: RootState) => state.notifications,
}
