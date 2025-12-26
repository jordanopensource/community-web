<template>
  <div class="relative mt-24 slash-separator"></div>
</template>
<style scoped>
.slash-separator:before {
  --border-width: 6px;
  --stripe-distance: 10px;
  height: 0.75rem;
  position: absolute;
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
