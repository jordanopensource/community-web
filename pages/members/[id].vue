<template>
  <div>
    <Banner bannerText="JOSA Members" />
    <div class="container">
      <MemberBanner
        v-if="!pendingMember"
        :member="memberData.member"
        :memberAuth="isUserLogged"
        @updateMember="() => refresh()"
      />
      <div class="flex">
        <div class="flex flex-col w-full">
          <div class="block lg:hidden">
            <MemberCard v-if="!pendingMember" :member="memberData.member" />
          </div>
          <MemberDetails
            v-if="!pendingMember
              && !(memberData.settings.hideAbout && !isUserLogged)"
            :member="memberData.member"
            :settings="memberData.settings"
            :memberAuth="isUserLogged"
            @updateMember="() => refresh()"
          />
          <MemberExperience
            v-if="(memberData.experience.length || memberData.education.length)
             && !(memberData.settings.hideExperienceAndEducation && !isUserLogged)"
            :experience="memberData.experience"
            :education="memberData.education"
            :memberAuth="isUserLogged"
            :settings="memberData.settings"
            @updateMember="() => refresh()"
          />
          <MemberContribution
            v-if="!pendingMember"
            :contributions="memberData.contributions"
            :opensource-contributions="memberData.open_source_contributions"
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
definePageMeta({
  middleware: 'auth',
})
const config = useRuntimeConfig()
const route = useRoute()
const user_id = route.params.id
const isUserLogged = route.params.id === userId().value
const {
  data: memberData,
  pending: pendingMember,
  refresh,
} = await useFetch(`${config.public.COMMUNITY_API_URL}/member/${user_id}`)
onMounted(() => {
  refresh()
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
