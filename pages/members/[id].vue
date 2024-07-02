<template>
  <div>
    <Banner bannerText="JOSA Members" />
    <div class="container" v-if="!pendingMember && memberDataRef">
      <MemberBanner
        :member="memberDataRef.member"
        :memberAuth="isUserLogged"
        @updateMember="() => refresh()"
      />
      <div class="flex">
        <div class="flex flex-col w-full">
          <div class="block lg:hidden">
            <MemberCard :member="memberDataRef.member" />
          </div>
          <MemberDetails
            v-if="memberDataRef.member.about || isUserLogged"
            :member="memberDataRef.member"
            :settings="memberDataRef.settings"
            :memberAuth="isUserLogged"
            @updateMember="() => refresh()"
          />
          <MemberExperience
            v-if="
              memberDataRef.experience.length ||
              memberDataRef.education.length ||
              isUserLogged
            "
            :experience="memberDataRef.experience"
            :education="memberDataRef.education"
            :memberAuth="isUserLogged"
            :settings="memberDataRef.settings"
            @updateMember="() => refresh()"
          />
          <MemberContribution
            v-if="
              memberDataRef.contributions.length ||
              memberDataRef.open_source_contributions.github_contributions
                .length ||
              Object.keys(
                memberDataRef.open_source_contributions
                  .wikimedia_contributions
              ).length ||
              isUserLogged
            "
            :contributions="memberDataRef.contributions"
            :opensource-contributions="
              memberDataRef.open_source_contributions
            "
            :settings="memberDataRef.settings"
            :githubUserName="memberDataRef.member.github_user"
            :wikiMediaUserName="memberDataRef.member.wikimedia_user"
          />
        </div>
        <div class="hidden lg:block">
          <MemberCard :member="memberDataRef.member" />
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
const isUserLogged = computed(() => route.params.id === userId().value && isAuth().value)
const {
  data: memberData,
  pending: pendingMember,
  refresh,
} = useLazyAsyncData(async () => {
  return await useFetchMember(user_id)
})

const memberDataRef = computed(() => memberData.value)

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
