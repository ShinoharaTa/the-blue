// https://qiita.com/shindex/items/a90217b9e4c03c5b5215

import {
  getAccessorType,
  actionTree,
  mutationTree,
  getterTree,
} from 'typed-vuex'

// 例えば、store/age.ts のようなサブモジュールが存在する場合、
// ここで import しておきます。
// import * as age from '~/store/age'

// ここでは、state, getters, mutations, actions の記法は省略しています。
// 記法については、後ほど記述する store/age.ts を参照してください。
// これらは、たとえ必要なくても、以下のように空でいいので、必ず記述してください。
export const state = () => {
  return {
    timeline: [] as Array<Object>,
  }
}

export const getters = {
  //
}

export const mutations = {
  //
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
