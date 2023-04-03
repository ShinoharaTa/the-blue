<template>
  <nav class="navbar navbar-light glass sticky-top">
    <div class="container-fluid max-width">
      <!-- <a class="navbar-brand" href=""></a> -->
      <div>
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

export default Vue.extend({})
</script>
<style>
</style>
