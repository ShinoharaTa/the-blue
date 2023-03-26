<template>
  <div>
    <svg :width="38" :height="38">
      <circle class="circle-bg" :cx="19" :cy="19" :r="15" />
      <circle
        class="circle"
        :class="{ red: isRed }"
        :cx="19"
        :cy="19"
        :r="15"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
      <text v-if="text.length > 246" class="percentage" :x="center" :y="center">
        {{ 256 - text.length }}
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      center: 19,
      radius: 15,
      isRed: false as boolean,
    }
  },
  computed: {
    percentage() {
      const length = this.text.length
      if (length === 0) return 0
      return (Math.min(length, 256) / 256) * 100
    },
    dashArray() {
      const length = this.text.length
      const circumference = 2 * Math.PI * 15
      return `${(length / 256) * circumference} ${circumference}`
    },
    dashOffset() {
      return 0
      // const circumference = 2 * Math.PI * this.radius;
      // return circumference - (this.percentage / 100 * circumference);
    },
  },
  watch: {
    text(newValue) {
      this.isRed = newValue.length >= 257
    },
  },
})
</script>

<style>
.circle-bg {
  fill: none;
  stroke: #fff;
  stroke-width: 5;
  stroke-linecap: round;
}

.circle {
  fill: none;
  stroke: #0089a7;
  stroke-width: 5;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dasharray 0.5s ease 0s, stroke 0.5s ease;
}

.circle.red {
  stroke: #ff0000;
}

.percentage {
  fill: #666;
  font-size: 0.7rem;
  text-anchor: middle;
  dominant-baseline: central;
}
</style>
