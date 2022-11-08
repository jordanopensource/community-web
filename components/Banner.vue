<template>
  <div
    class="py-20 lg:py-36"
    :class="[!props.whiteBackground ? 'black-background' : 'white-background']"
  >
    <div :class="[props.enableContainer && 'container']">
      <div class="divider-slashes">
        <h1
          class="banner-header"
          :class="
            !props.whiteBackground ? 'black-background' : 'white-background'
          "
        >
          {{ props.bannerText }}
        </h1>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  bannerText: { type: String, default: '' },
  whiteBackground: { type: Boolean, default: false },
  enableContainer: { type: Boolean, default: true },
})
</script>
<style lang="postcss" scoped>
.black-background {
  @apply bg-josa-black;
  @apply text-josa-warm-grey-light;
}
.white-background {
  @apply bg-josa-warm-grey-light;
  @apply text-josa-black;
}

/* .banner-header {
  @apply leading-5 lg:leading-10;
  @apply text-3xl lg:text-5xl tracking-normal font-normal;
  @apply inline;
  @apply pr-4;
} */

.banner-header {
  @apply text-4xl;
  @apply inline;
  @apply pr-16 lg:pr-20;
}
</style>
