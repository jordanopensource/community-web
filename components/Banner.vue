<template>
  <div
    class="banner"
    :class="[
      !props.whiteBackground ? 'black-background' : 'white-background',
      props.enableContainer ? 'bg-slashes' : 'bg-slashesHome',
    ]"
  >
    <div :class="props.enableContainer && 'container'">
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
</template>
<script setup>
const props = defineProps({
  bannerText: { type: String, default: '' },
  whiteBackground: { type: Boolean, default: false },
  enableContainer: { type: Boolean, default: true },
})
</script>
<style lang="postcss" scoped>
.banner {
  @apply py-28;
  @apply bg-no-repeat bg-local bg-center;
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
}
</style>
