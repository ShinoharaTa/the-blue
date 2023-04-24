<template>
  <div class="max-width mx-auto" v-if="user">
    <div class="head-img">
      <img :src="user.banner" class="img-fluid" />
    </div>
    <div class="d-flex icon-outline">
      <div class="user-icon">
        <img :src="user.avatar" class="img-fluid" />
      </div>
      <div class="icon-bottom pt-4 pb-5"></div>
    </div>
    <div class="fs-3">
      {{ formattedName.name }}
    </div>
    <div class="fs-5">
      {{ formattedName.handle }}
    </div>
    <div v-html="user.description"></div>
    <div class="text-break">
      {{ user }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data() {
    return {
      user: null as any,
    }
  },
  middleware: ['session'],
  async mounted() {
    const userName = this.$route.params.id
    if (userName) {
      const { data } = await this.$atp.getProfile({ actor: userName })
      this.user = data
      // console.log(user);
    } else {
      // console.error();
      // throw Error("ページが見つかりません");
    }
  },
  computed: {
    // ...mapGetters({
    //   user: 'user',
    // }),
    formattedName: function () {
      if (this.user) {
        return {
          name: this.user.displayName
            ? this.user.displayName
            : this.user.handle,
          handle: this.user.displayName ? this.user.handle : '',
        }
      }
      return null
    },
  },
})
</script>

<style lang="scss" scoped>
.icon-outline {
  position: relative;
}

.user-icon {
  position: absolute;
  top: 0;
  left: 15%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 140px;
  border-radius: 50%;
  border: 4px solid #fff;
  overflow: hidden;
  > img {
    aspect-ratio: 1/1;
  }
}
</style>
