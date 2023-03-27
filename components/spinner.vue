<template>
  <div class="d-flex justify-content-center align-items-center outline">
    <div class="loading-box">
      <div class="circle-border">
        <div class="circle-core"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}

.outline {
  width: 100%;
  height: 100vh;
}

.loading-box {
  padding: 50px;
  background-color: #f8f8f8;
  border-radius: 50%;
  /* box-shadow: 0px 15px 20px 0px #4445; */
}

.circle-border {
  width: 150px;
  height: 150px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #00a3a6;
  background: linear-gradient(0deg, #f8f8f8 33%, #00a3a6 100%);
  animation: spin 1.6s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  border-radius: 50%;
}
</style>
