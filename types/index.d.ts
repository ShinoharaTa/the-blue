// import { accessorType } from '~/store'

// declare module 'vue/types/vue' {
//   interface Vue {
//     $accessor: typeof accessorType
//   }
// }

// declare module '@nuxt/types' {
//   interface NuxtAppOptions {
//     $accessor: typeof accessorType
//   }
// }

declare module 'pica' {
  function pica(options?: pica.Options): pica.Pica

  namespace pica {
    interface Options {
      tile?: number
      features?: string[]
      idle?: number
      concurrency?: number
    }

    interface Pica {
      resize(
        from: HTMLImageElement | HTMLCanvasElement,
        to: HTMLCanvasElement,
        options?: ResizeOptions
      ): Promise<void>
      toBlob(
        canvas: HTMLCanvasElement,
        mimeType: string,
        quality?: number
      ): Promise<Blob>
    }

    interface ResizeOptions {
      quality?: number
      alpha?: boolean
      unsharpAmount?: number
      unsharpRadius?: number
      unsharpThreshold?: number
      transferable?: boolean
    }
  }

  export = pica
}
