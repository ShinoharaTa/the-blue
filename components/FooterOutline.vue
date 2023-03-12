<template>
  <div class="fixed-bottom">
    <div class="footer-outline">
      <div class="me-3 mb-3 write-button">
        <button class="post-icon btn-theme">
          <fa-icon :icon="['fas', 'rocket']" class="fa-lg" />
        </button>
      </div>
      <div class="row p-2 px-4 glass g-0">
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
    </div>
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
    border: 2px solid #0089A7;
    color: #0089A7;
  }
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-outline {
  position: relative;

}
.write-button {
  position: absolute;
  top: -1rem;
  right: 1.5rem;
  transform: translate(50%, -100%);
  -webkit-transform: translate(50%, -100%);
  -ms-transform: translate(50%, -100%);
}

.post-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
