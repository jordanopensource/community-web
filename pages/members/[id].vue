<template>
  <Banner bannerText="JOSA Members" />
  <div class="container">
    <MemberBanner v-if="!pendingMember" :member="memberData.member" />
    <div class="flex gap-x-4">
      <div class="hidden lg:block">
        <MemberCard v-if="!pendingMember" :member="memberData.member" />
        <MemberScore v-if="!pendingMember" :member="memberData.member" />
      </div>
      <div class="flex flex-col w-full">
        <MemberDetails v-if="!pendingMember" :member="memberData.member" />
        <MemberExperience
          v-if="memberData.experience.length || memberData.education.length"
          :experience="memberData.experience"
          :education="memberData.education"
        />
        <MemberContribution
          v-if="!pendingMember"
          :contributions="memberData.contributions"
        />
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
