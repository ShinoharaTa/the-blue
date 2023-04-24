<template>
  <div class="fixed-bottom p-2 px-4 glass">
    <div class="row max-width mx-auto">
      <div class="col">
        <nuxt-link
          to="/"
          class="footer-icon"
          :class="{ active: pageRoot('index') }"
        >
          <fa-icon :icon="['fas', 'house']" class="fa-lg"></fa-icon>
        </nuxt-link>
      </div>
      <!-- <div class="col">
        <div class="footer-icon" :class="{ active: pageRoot('images') }">
          <fa-icon :icon="['fas', 'image']" class="fa-lg"></fa-icon>
        </div>
      </div> -->
      <div class="col">
        <nuxt-link
          to="notification"
          class="footer-icon"
          :class="{ active: pageRoot('notification') }"
        >
          <fa-icon :icon="['fas', 'bell']" class="fa-lg"></fa-icon>
        </nuxt-link>
      </div>
      <div class="col">
        <nuxt-link
          to="setting"
          class="footer-icon"
          :class="{ active: pageRoot('setting') }"
        >
          <img :src="user?.avatar" class="img-fluid" />
          <!-- <fa-icon :icon="['fas', 'house']" class="fa-lg"></fa-icon> -->
        </nuxt-link>
      </div>
    </div>
    <div class="ios-padding"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  methods: {
    pageRoot: function (page: string) {
      return page === this.$route.name
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
.footer-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  border: 2px solid #fff;
  background: #fff;
  justify-content: center;
  align-items: center;
  color: #000000;
  &.active {
    background: #fff;
    border: 2px solid #0089a7;
    color: #0089a7;
  }
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
