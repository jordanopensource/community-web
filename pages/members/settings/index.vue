<template>
  <div>
    <Banner banner-text="Settings" />
    <div class="container flex flex-col w-full">
      <MemberSettings
        v-if="!pending"
        :member="memberData.member"
        :settings="memberData.settings"
      />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
})
const url = `/api/member/?id=${userId().value}`
const {
  data: memberData,
  pending,
  refresh: refreshMember,
} = await useFetch(url)
onMounted(() => {
  refreshMember()
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
