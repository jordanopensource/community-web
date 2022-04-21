<template>
  <HeroBanner bannerText="JOSA Members" />
  <MemberDetails v-if="state.memberData" :member="state.memberData" />
  <MemberExperience
    v-if="state.memberExperience"
    :experience="state.memberExperience"
    :education="state.memberEducation"
  />
</template>
<script setup>
const state = reactive({
  memberData: null,
  memberExperience: null,
  memberEducation: null,
})
onMounted(() => {
  fetch('../../assets/data/all_members.json')
    .then((res) => res.json())
    .then((json) => {
      state.memberData = json[0]
    })
  fetch('../../assets/data/experience.json')
    .then((res) => res.json())
    .then((json) => {
      state.memberExperience = json
    })
  fetch('../../assets/data/education.json')
    .then((res) => res.json())
    .then((json) => {
      state.memberEducation = json
    })
})
</script>
