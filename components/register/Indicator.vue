<template>
  <div
    :class="
      props.step == props.phaseNumber ? 'indicator-wrapper' : 'grayed-out'
    "
    class="p-5 md:p-8"
  >
    <p class="text-wrapper">
      <span class="phase-number">{{ props.phaseNumber }}.</span>
      <span
        class="phase-text"
        :class="props.step == props.phaseNumber ? 'inline' : 'hidden'"
        >{{ props.phaseText }}</span
      >
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  step: {
    type: Number,
    default: 1,
  },
  phaseNumber: {
    type: String,
    default: '1',
  },
  phaseText: {
    type: String,
    default: '',
  },
})
</script>
<style lang="postcss" scoped>
.indicator-wrapper {
  @apply bg-white;
  @apply h-28;
}
.text-wrapper {
  @apply text-xl lg:text-2xl font-bold;
}
.phase-text {
  @apply uppercase;
  @apply lg:inline;
}
.phase-number {
  @apply text-3xl lg:text-5xl;
  color: #6db981;
}

.grayed-out {
  @apply text-gray-400;
  @apply opacity-30;

  .phase-number {
    @apply text-gray-400;
  }
}
</style>
