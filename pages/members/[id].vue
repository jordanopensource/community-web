<template>
  <div>
    <Banner bannerText="JOSA Members" />
    <div class="container" v-if="state.memberData">
      <MemberBanner
        v-if="!pendingMember"
        :member="memberData.member"
        :memberAuth="isUserLogged"
        @updateMember="() => refresh()"
      />
      <div class="flex">
        <div class="flex flex-col w-full">
          <div class="block lg:hidden">
            <MemberCard v-if="!pendingMember" :member="state.memberData.member" />
          </div>
          <MemberDetails
            v-if="!pendingMember && !(state.memberData.settings.hideAbout && !isUserLogged)"
            :member="state.memberData.member"
            :settings="state.memberData.settings"
            :memberAuth="isUserLogged"
            @updateMember="() => refresh()"
          />
          <MemberExperience
            v-if="!pendingMember && (state.memberData.experience.length || state.memberData.education.length)
             && !(state.memberData.settings.hideExperienceAndEducation && !isUserLogged)"
            :experience="state.memberData.experience"
            :education="state.memberData.education"
            :memberAuth="isUserLogged"
            :settings="state.memberData.settings"
            @updateMember="() => refresh()"
          />
          <MemberContribution
            v-if="!pendingMember"
            :contributions="state.memberData.contributions"
            :opensource-contributions="state.memberData.open_source_contributions"
            :settings="state.memberData.settings"
          />
        </div>
        <div class="hidden lg:block">
          <MemberCard v-if="!pendingMember" :member="state.memberData.member" />
        </div>
      </div>
    </div>
    <div v-else class="container flex flex-row justify-center h-40">
      <div class="loader self-center"></div>
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
} = await useLazyFetch(`${config.public.COMMUNITY_API_URL}/member/${user_id}`)

const state = reactive({
  memberData: memberData 
})

watch(memberData, (newMemberData) => { 
  state.memberData = newMemberData
})
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
