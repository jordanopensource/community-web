<template>
  <div>
    <section class="banner">
      <div class="banner-container container">
        <div class="banner-header">
          <h1>{{ props.bannerText }}</h1>
        </div>
        <div class="slash-section"></div>
      </div>
    </section>
  </div>
</template>
<script setup>
const props = defineProps({
  bannerText: { type: String, default: '' },
})
</script>
<style lang="postcss" scoped>
* {
  @apply bg-josa-black;
}

.banner {
  @apply py-28 mx-9;
  @apply h-auto;
}

.banner-container {
  @apply flex flex-col md:flex-row justify-between;
  @apply text-josa-warm-grey;
  @apply relative;
  @apply px-20;
}

.banner-header {
  /* font-family: 'IBM Mono'; */
  @apply text-3xl lg:text-4xl tracking-wide font-normal;
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
    #4b5563,
    transparent 1px,
    transparent var(--stripe-distance),
    #4b5563 calc(var(--stripe-distance) + 1px)
  );
  z-index: 1;
}
</style>
