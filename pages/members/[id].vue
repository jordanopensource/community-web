<template>
  <Banner bannerText="JOSA Members" />
  <div class="container">
    <MemberDetails v-if="!pendingMember" :member="memberData" />
    <div class="flex gap-x-4">
      <div class="sm:hidden lg:block">
        <MemberCard v-if="!pendingMember" :member="memberData" />
      </div>
      <div class="flex flex-col w-full">
        <MemberExperience
          v-if="!pendingEducation && !pendingEducation"
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
  `${config.BASE_API_URL}/experience/find-by-member?member_id=${user_id}`
)

const { data: memberEducation, pending: pendingEducation } = await useFetch(
  `${config.BASE_API_URL}/education/find-by-member?member_id=${user_id}`
)
</script>
