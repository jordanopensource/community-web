<template>
  <div>
    <Banner banner-text="Settings" />
    <div class="container flex flex-col w-full">
      <MemberSettings
        v-if="status === 'success'"
        :member="data.member"
        :settings="data.settings"
      />
      <div v-else class="container flex flex-row justify-center h-40">
        <div class="loader self-center"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'sidebase-auth',
})
const url = `/api/member/?id=${userId().value}`
const { data, status } = await useLazyFetch(url)
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
