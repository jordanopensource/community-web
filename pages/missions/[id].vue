<template>
  <div>
    <Banner bannerText="Contribute" />
    <div class="container">
      <MissionInfo
        v-if="!pendingMission && missionData?.id"
        :mission="missionData"
      />
    </div>
  </div>
</template>
<script setup></script>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const MISSION_ID = route.params.id

const { data: missionData, pending: pendingMission } = await useFetch(
  `${config.COMMUNITY_API_URL}/mission/${MISSION_ID}`
)
</script>
