<template>
  <div>
    <Banner bannerText="JOSA Members" />
    <div class="container p-0">
      <MemberBanner v-if="!pendingMember" :member="memberData.member" />
      <div class="flex gap-x-4">
        <div class="flex flex-col w-full">
          <MemberDetails v-if="!pendingMember" :member="memberData.member" />
          <MemberExperience
            v-if="memberData.experience.length || memberData.education.length"
            :experience="memberData.experience"
            :education="memberData.education"
          />
          <MemberContribution
            v-if="!pendingMember && memberData.contributions.length"
            :contributions="memberData.contributions"
          />
        </div>
        <div class="hidden lg:block">
          <MemberCard v-if="!pendingMember" :member="memberData.member" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const user_id = route.params.id

const { data: memberData, pending: pendingMember } = await useFetch(
  `${config.COMMUNITY_API_URL}/member/${user_id}`
)
</script>

<style scoped lang="postcss">
.details-container {
  @apply bg-white;
  @apply m-2 lg:my-4;
  @apply p-4 lg:p-8;
  @apply rounded-lg;
}
</style>