<template>
  <div
    class="py-28"
    :class="[!props.whiteBackground ? 'black-background' : 'white-background']"
  >
    <div :class="[props.enableContainer && 'container']">
      <div class="banner-background">
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
.banner-background {
  @apply bg-slashes;
  @apply bg-repeat;
  @apply bg-right;
  /* @apply bg-cover; */
}

.black-background {
  @apply bg-josa-black;
  @apply text-josa-warm-grey-light;
}
.white-background {
  @apply bg-josa-warm-grey-light;
  @apply text-josa-black;
}

.banner-header {
  @apply text-3xl lg:text-5xl tracking-wide font-normal;
  @apply inline;
  @apply pr-4;
}
</style>
