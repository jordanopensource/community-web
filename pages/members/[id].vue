<template>
  <div>
    <Banner bannerText="JOSA Members" />
    <div class="container">
      <MemberBanner v-if="!pendingMember" :member="memberData.member" />
      <div class="flex">
        <div class="flex flex-col w-full">
          <div class="block lg:hidden">
            <MemberCard v-if="!pendingMember" :member="memberData.member" />
          </div>
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
  `${config.public.COMMUNITY_API_URL}/member/${user_id}`
)
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
