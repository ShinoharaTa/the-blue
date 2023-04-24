import moment from 'moment'
// https://qiita.com/shindex/items/a90217b9e4c03c5b5215

export const state = () => ({
  overlay: false as boolean,
  loading: false as boolean,
  lightboxImages: null as Array<Image> | null,
  toasts: [] as Array<Toast>,
  user: null as Object | null,
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
  setLoading(state: RootState, status: boolean) {
    state.loading = status
  },
  setUser(state: RootState, params: {user: object}) {
    state.user = params.user
    console.log(params.user)
  },
  clearUser(state: RootState) {
    state.user = null
  },
  addToast(
    state: RootState,
    params: { message: string; status: string }
  ) {
    const created = moment().format('HHmmss') + moment().milliseconds()
    state.toasts.push({
      message: params.message,
      status: params.status,
      id: created,
    })
  },
  removeToast(state: RootState, params: { id: string }) {
    const index = state.toasts.findIndex(
      (t) => t.id === params.id
    )
    if (index !== -1) {
      state.toasts.splice(index, 1)
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
  toasts: (state: RootState) => state.toasts,
  loading: (state: RootState) => state.loading,
  user: (state: RootState) => state.user,
}
