<template>
  <div class="slash-separator"></div>
</template>
<style lang="postcss" scoped>
.slash-separator {
  @apply relative;
  @apply mt-24;
}
.slash-separator:before {
  --border-width: 6px;
  --stripe-distance: 10px;
  @apply h-3;
  @apply absolute;
  content: '';
  left: calc(var(--border-width) * -1);
  right: calc(var(--border-width) * -1);
  top: calc(var(--border-width) * -1);
  bottom: calc(var(--border-width) * -1);
  background: repeating-linear-gradient(
    -45deg,
    #bababa,
    transparent 1px,
    transparent var(--stripe-distance),
    #bababa calc(var(--stripe-distance) + 1px)
  );
  z-index: 1;
}
</style>
