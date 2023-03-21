<template>
  <div class="spinner-box">
    <div class="circle-border">
      <div class="circle-core"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}

.circle-border {
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #00a3a6;
  background: linear-gradient(0deg, #080808 33%, #00a3a6 100%);
  animation: spin 1.6s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background-color: #080808;
  border-radius: 50%;
}
</style>
