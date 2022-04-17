<template>
  <HeroBanner bannerText="JOSA Members" />
  <MemberDetails v-if="state.memberData" :member="state.memberData" />
</template>
<script setup>
const state = reactive({
  memberData: null,
})
onMounted(() => {
  fetch('../../assets/data/all_members.json')
    .then((res) => res.json())
    .then((json) => {
      state.memberData = json[0]
    })
})
</script>
