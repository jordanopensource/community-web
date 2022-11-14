<template>
  <div class="bg-josa-warm-grey-light">
    <DroneInfoBanner v-if="config.public.TARGET_ENV === 'development'" />
    <PageHeader />
    <NuxtPage />
    <PageFooter />
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
// if (config.public.TARGET_ENV === 'development') {
console.log(`SETTINGS `, config.public)
// }
</script>
