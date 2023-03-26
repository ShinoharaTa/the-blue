<template>
  <div class="fixed-bottom p-2 px-4 glass">
    <div class="row max-width mx-auto">
      <div class="col">
        <div class="footer-icon active">
          <fa-icon :icon="['fas', 'house']" class="fa-lg"></fa-icon>
        </div>
      </div>
      <div class="col">
        <div class="footer-icon">
          <fa-icon :icon="['fas', 'image']" class="fa-lg"></fa-icon>
        </div>
      </div>
      <div class="col">
        <div class="footer-icon">
          <fa-icon :icon="['fas', 'bell']" class="fa-lg"></fa-icon>
        </div>
      </div>
      <div class="col">
        <div class="footer-icon">
          <fa-icon :icon="['fas', 'house']" class="fa-lg"></fa-icon>
        </div>
      </div>
    </div>
    <div class="ios-padding"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
<style lang="scss" scoped>
.footer-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  border: 2px solid #fff;
  background: #fff;
  justify-content: center;
  align-items: center;
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
