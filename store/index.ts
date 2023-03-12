// https://qiita.com/shindex/items/a90217b9e4c03c5b5215

import {
  getAccessorType,
  actionTree,
  mutationTree,
  getterTree,
} from 'typed-vuex'

export const state = () => ({
  overlay: false as Boolean,
  lightboxImages: null as Array<Object> | null,
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  overlayView: (state) => state.overlay,
  lightboxImages: (state) => state.lightboxImages,
})

export const mutations = {
  setOverlay(state: RootState, value: boolean) {
    state.overlay = value
  },
  setLightboxImages(state: RootState, params: {images: Array<object> | null, page: number}) {
    state.lightboxImages = params.images;
    console.log(params.page);
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
