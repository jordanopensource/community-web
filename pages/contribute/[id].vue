<template>
  <Banner bannerText="JOSA Members" />
  <div class="container">
    <MemberBanner v-if="!pendingMember" :member="memberData" />
    <div class="flex gap-x-4">
      <div class="hidden lg:block">
        <MemberCard v-if="!pendingMember" :member="memberData" />
        <MemberScore />
      </div>
      <div class="flex flex-col w-full">
        <MemberDetails v-if="!pendingMember" :member="memberData" />
        <MemberExperience
          v-if="memberExperience.length || memberEducation.length"
          :experience="memberExperience"
          :education="memberEducation"
        />
        <MemberContribution />
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const user_id = route.params.id

const { data: memberData, pending: pendingMember } = await useFetch(
  `${config.BASE_API_URL}/member/${user_id}`
)

const { data: memberExperience, pending: pendingExperience } = await useFetch(
  `${config.BASE_API_URL}/experience/${user_id}`
)

const { data: memberEducation, pending: pendingEducation } = await useFetch(
  `${config.BASE_API_URL}/education/${user_id}`
)
</script>
