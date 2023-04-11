<template>
  <div class="centering">
    <div class="login-form px-2">
      <div class="logo">The Blue</div>
      <div class="logo-caption">君とみた青空の先は</div>
      <div class="mt-5">
        <!-- <input
          type="text"
          v-model="service"
          class="form-control"
          placeholder="Service Provider"
        />
      </div>
      <div class="mt-3"> -->
        <input
          type="text"
          v-model="identifier"
          class="form-control"
          placeholder="星屑旅団の使者"
        />
      </div>
      <div class="mt-3">
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="夢幻暗号の門扉"
        />
      </div>
      <div class="mt-3 text-center form-text text-danger">
        {{ this.error }}
      </div>
      <div class="mt-2 d-grid">
        <button @click="login" class="btn btn-primary">羽ばたく</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface LoginForm {
  service: string
  identifier: string
  password: string
  error: string
}

export default Vue.extend({
  layout: 'single',
  data(): LoginForm {
    return {
      service: 'bsky.social',
      identifier: '',
      password: '',
      error: '',
    }
  },
  mounted() {
    if (this.$config.env === 'local') {
      this.identifier = this.$config.email
      this.password = this.$config.pass
    }
  },
  methods: {
    async login() {
      let res = await this.$atp.login(
        this.identifier,
        this.password,
        this.service
      )
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
.logo {
  font-family: 'Noto Serif JP', serif;
  font-family: 'Playfair Display', serif;
  color: #fff;
  text-align: center;
  font-size: 4rem;
}

.logo-caption {
  font-family: 'Noto Serif JP', serif;
  font-family: 'Playfair Display', serif;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
}

.centering {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(220.55deg, #00c0a9 0%, #7e6baf 100%);
}

.login-form {
  margin-top: -100px;
  width: 75%;
  max-width: 500px;
}
</style>
