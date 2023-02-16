<template>
  <div>
    <Banner bannerText="Settings" />
    <div class="container flex flex-col w-full">
      <MemberSettings/>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<style scoped lang="postcss">
.details-container {
  @apply bg-white;
  @apply mb-5 md:mb-10;
  @apply p-5 md:p-10;
  @apply rounded-lg;
  @apply md:text-lg;
}
.details-container:first-child {
  @apply mt-5 md:mt-10;
}
</style>
