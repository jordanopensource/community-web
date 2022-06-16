<template>
  <div v-if="!pending">
    <div v-for="(member, index) in members" :key="`item-${index}`">
      <MembersCard :member="member" />
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
let { data: members, pending } = await useFetch(
  `${config.BASE_API_URL}/member/all`
)
</script>
