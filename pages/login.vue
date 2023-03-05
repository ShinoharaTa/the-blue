<template>
  <div>
    <input type="text" v-model="identifier" />
    <input type="password" v-model="password" />
    <button @click="login">Take off</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      identifier: "",
      password: "",
    }
  },
  methods: {
    async login() {
      let res = await this.$atp.login(this.identifier, this.password)
      console.log("** debug", res)
    },
  },
});
</script>
