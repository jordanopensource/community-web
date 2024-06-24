<template>
  <div>
    <Banner bannerText="JOSA Members" />
    <div class="container" v-if="state.memberData">
      <MemberBanner
        :member="state.memberData.member"
        :memberAuth="isUserLogged"
        @updateMember="() => refresh()"
      />
      <div class="flex">
        <div class="flex flex-col w-full">
          <div class="block lg:hidden">
            <MemberCard :member="state.memberData.member" />
          </div>
          <MemberDetails
            v-if="state.memberData.member.about || isUserLogged"
            :member="state.memberData.member"
            :settings="state.memberData.settings"
            :memberAuth="isUserLogged"
            @updateMember="() => refresh()"
          />
          <MemberExperience
            v-if="
              state.memberData.experience.length ||
              state.memberData.education.length ||
              isUserLogged
            "
            :experience="state.memberData.experience"
            :education="state.memberData.education"
            :memberAuth="isUserLogged"
            :settings="state.memberData.settings"
            @updateMember="() => refresh()"
          />
          <MemberContribution
            v-if="
              state.memberData.contributions.length ||
              state.memberData.open_source_contributions.github_contributions
                .length ||
              Object.keys(
                state.memberData.open_source_contributions
                  .wikimedia_contributions
              ).length ||
              isUserLogged
            "
            :contributions="state.memberData.contributions"
            :opensource-contributions="
              state.memberData.open_source_contributions
            "
            :settings="state.memberData.settings"
            :githubUserName="state.memberData.member.github_user"
            :wikiMediaUserName="state.memberData.member.wikimedia_user"
          />
        </div>
        <div class="hidden lg:block">
          <MemberCard :member="state.memberData.member" />
        </div>
      </div>
    </div>
    <div v-else class="container flex flex-row justify-center h-40">
      <div class="loader self-center"></div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
const user_id = route.params.id
const isUserLogged = route.params.id === userId().value
const {
  data: memberData,
  pending: pendingMember,
  refresh,
} = useLazyAsyncData(async () => {
  return await useFetchMember(user_id)
})

const state = reactive({
  memberData: memberData.value,
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
