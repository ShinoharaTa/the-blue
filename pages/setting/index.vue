<template>
  <div class="list-outline">
    <div class="list-item header">設定</div>
    <a href="javascript:void(0)" @click="logout()" class="list-item"
      >ログアウト</a
    >
    <a href="javascript:void(0)" @click="nanachi()" class="list-item"
      >んなぁ～！</a
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  middleware: ['session'],
  data() {
    return {
      process: false as boolean,
    }
  },
  methods: {
    logout: function () {
      this.$atp.logout()
      this.$store.commit('clearUser')
      this.$router.push('/login')
    },
    nanachi: function () {
      if (!this.process) {
        this.$atp.post({
          text: 'ﾝﾅｧ～!!!',
        })
        this.process = true
        console.log('on')
        setTimeout(() => {
          this.process = false
          console.log('off')
        }, 60000)
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
})
</script>

<style lang="scss" scoped>
.list-outline {
  .header {
    background-color: #0089a7;
    color: #f0f0f0;
  }
  .list-item {
    display: block;
    padding: 1rem 2rem;
    border-bottom: 1px #ccc solid;
  }
  a {
    text-decoration: none;
    color: #212529;
  }
}
</style>
