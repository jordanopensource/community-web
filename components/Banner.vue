<template>
  <div
    class="banner"
    :class="!props.whiteBackground ? 'black-background' : 'white-background'"
  >
    <div class="banner-container container">
      <div class="banner-header">
        <h1>{{ props.bannerText }}</h1>
      </div>
      <div class="slash-section"></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  bannerText: { type: String, default: '' },
  whiteBackground: { type: Boolean, default: false },
})
</script>
<style lang="postcss" scoped>
.banner {
  @apply h-auto;
}

.black-background {
  @apply bg-josa-black;
  @apply text-josa-warm-grey-light;
}
.white-background {
  @apply bg-josa-warm-grey-light;
  @apply text-josa-black;
}
.banner-container {
  @apply flex flex-col md:flex-row justify-between;
  @apply relative;
  @apply py-28;
  @apply px-20;
  @apply gap-x-8;
  /* @apply bg-slashes bg-no-repeat bg-right  bg-contain;N */
}

.banner-header {
  @apply text-3xl lg:text-5xl tracking-wide font-normal;
  @apply w-full;
}
.slash-section {
  @apply relative;
  @apply w-full;
  @apply mt-12 md:mt-0;
  @apply self-center;
}
.slash-section:before {
  @apply h-8;
  --border-width: 6px;
  --stripe-distance: 26px;
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
