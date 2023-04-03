<template>
  <nav class="navbar navbar-light glass sticky-top">
    <div class="container-fluid max-width">
      <!-- <a class="navbar-brand" href=""></a> -->
      <div @click="click()">
        {{ this.$config.env + this.$config.buildtime }}
      </div>
      <div class="">
        <slot />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

const message = [
  {
    text: 'えいっ',
    color: 'info',
  },
  {
    text: 'ファイヤー',
    color: 'info',
  },
  {
    text: 'アイスストーム',
    color: 'info',
  },
  {
    text: 'ダイアキュート',
    color: 'success',
  },
  {
    text: 'ブレインダムド',
    color: 'success',
  },
  {
    text: 'ジュゲム',
    color: 'warning',
  },
  {
    text: 'ばよえ～ん',
    color: 'error',
  },
]

export default Vue.extend({
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    click() {
      this.$store.commit('addToast', {
        message: message[this.count].text,
        status: message[this.count].color,
      })
      if (this.count < message.length) this.count++
    },
  },
})
</script>
<style>
</style>
