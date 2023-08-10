/// <reference types="vite/client" />

// 为.vue文件赋类型,开启volar插件时写不写都不会报错，关闭时，引入.vue文件无法识别，如在main.ts文件引入App.vue报错
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.mjs'
