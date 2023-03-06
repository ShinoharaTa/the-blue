import { accessorType } from '~/store'
import atproto from '~/plugins/atp'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $atp: typeof atproto
  }
}

declare module '@nuxt/types' {
  interface Context {
    // plugins/my-plugin.ts
    $atp: typeof atproto
  }
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
