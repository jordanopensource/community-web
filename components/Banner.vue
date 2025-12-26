<template>
  <div
    class="py-20 lg:py-36"
    :class="!props.whiteBackground ? 'bg-community-black text-community-grey-light' : 'bg-community-grey-light text-community-black'"
  >
    <div :class="[props.enableContainer && 'container']">
      <div class="bg-slashes bg-repeat bg-right bg-top">
        <h1
          class="text-4xl inline pr-16 lg:pr-20"
          :class="!props.whiteBackground ? 'bg-community-black text-community-grey-light' : 'bg-community-grey-light text-community-black'"
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
