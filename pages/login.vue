<template>
  <div class="centering">
    <div class="login-form px-2">
      <div class="mt-3">
        <input
          type="text"
          v-model="identifier"
          class="form-control"
          placeholder="真名を告げよ"
        />
      </div>
      <div class="mt-3">
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="あいことば"
        />
      </div>
      <div class="mt-3 text-center form-text text-danger">
        {{ this.error }}
      </div>
      <div class="mt-2 d-grid">
        <button @click="login" class="btn btn-primary">はばたけッ！！！</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      identifier: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      let res = await this.$atp.login(this.identifier, this.password)
      if (res) {
        this.$router.push('/')
      } else {
        this.error = 'ログインできませんでした'
      }
      console.log('** debug', res)
    },
  },
})
</script>

<style>
.centering {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 75%;
  max-width: 500px;
}
</style>
